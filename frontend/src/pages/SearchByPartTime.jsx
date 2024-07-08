import React, { useState, useEffect } from 'react';
import { Center, Flex, Spinner, Box, Select } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import JobCard from '../components/JobCard/JobCard';

function SearchByPartTime() {
    const [loading, setLoading] = useState(false);
    const [vacancies, setVacancies] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`http://localhost:8000/part_time`);
                if (!response.ok) {
                    throw new Error(`Ошибка HTTP: ${response.status}`);
                }
                const data = await response.json();
                setVacancies(data.vacancies);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

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
            <Flex gap={'20px'} flexDir={"column"} align={"center"}>
                <Select placeholder='выберите действие' width={"200px"} onChange={handleSelectChange}>
                    <option value='option1'>Поиск по скилам</option>
                    <option value='option2'>Парсинг</option>
                    <option value='option3'>Поиск частичная</option>
                    <option value='option4'>Поиск фултайм</option>
                </Select>

                {loading && <Center><Spinner size="xl" mt="4" /></Center>}
                {error && <Box color="red.500" mt="4">{'вакансии не найдены'}</Box>}

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

export default SearchByPartTime;
