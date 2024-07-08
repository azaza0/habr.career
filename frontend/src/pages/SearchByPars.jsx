import React, { useState } from 'react';
import { Center, FormControl, FormLabel, Input, Flex, Button, Spinner, Box, Select } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import JobCard from '../components/JobCard/JobCard';

function SearchByPars() {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [vacancies, setVacancies] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearch = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://localhost:8000/search?query=${query}`);
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }
            const data = await response.json();
            setVacancies(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectChange = (e) => {
        const selectedOption = e.target.value;
        if (selectedOption === 'option1') {
            navigate('/');
        } else if (selectedOption === 'option2') {
            navigate('/searchByPars');
        } else if (selectedOption === 'option3') {
            navigate('/SearchByPartTime');
        } else if (selectedOption === 'option4') {
            navigate('/searchByFullTime');
        }
    };

    return (
        <Center mt={"30px"}>
            <Flex flexDir={"column"} gap={'20px'}>
                <Box display={"flex"} gap={"20px"}>
                    <Flex gap={"50px"} flexDir={"column"} justify={"space-between"}>
                        <Select placeholder='выберите действие' width={"200px"} onChange={handleSelectChange}>
                            <option value='option1'>Поиск по скилам</option>
                            <option value='option2'>Парсинг</option>
                            <option value='option3'>Поиск частичная</option>
                            <option value='option4'>Поиск фултайм</option>
                        </Select>
                    </Flex>
                    <FormControl>
                        <Input placeholder='Парсинг' value={query} onChange={handleInputChange} />
                    </FormControl>
                    <Button colorScheme='blue' variant='solid' w={"400px"} onClick={handleSearch}>
                        Отправить запрос
                    </Button>
                </Box>
                {loading && <Center><Spinner size="xl" mt="4" /></Center>}
                {error && <Box color="red.500" mt="4">{"Вакансии отсутствуют"}</Box>}

                {vacancies.length > 0 && (
                    <Flex flexDir="column" mt="4">
                        {vacancies.map((vacancy, index) => (
                            <JobCard key={index} {...vacancy} />
                        ))}
                    </Flex>
                )}
            </Flex>
        </Center>
    );
}

export default SearchByPars;
