import React, { useState, useEffect } from 'react';
import { Center, Flex, Spinner, Box, Select } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import JobCard from '../components/JobCard/JobCard';

function SearchByFullTime() {
    const [isLoading, setIsLoading] = useState(false);
    const [jobListings, setJobListings] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadJobListings = async () => {
            setIsLoading(true);
            setFetchError(null);

            try {
                const response = await fetch(`http://localhost:8000/full_time`);
                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.status}`);
                }
                const result = await response.json();
                setJobListings(result.vacancies);
            } catch (error) {
                setFetchError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        loadJobListings();
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

                {isLoading && <Center><Spinner size="xl" mt="4" /></Center>}
                {fetchError && <Box color="red.500" mt="4">{'вакансии не найдены'}</Box>}

                {jobListings.length > 0 && (
                    <Flex flexDir="column" mt="4">
                        {jobListings.map((job, index) => (
                            <JobCard key={index} {...job} />
                        ))}
                    </Flex>
                )}
            </Flex>
        </Center>
    );
}

export default SearchByFullTime;
