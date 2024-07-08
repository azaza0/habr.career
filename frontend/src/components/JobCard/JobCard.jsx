import React from 'react';
import { Box, Heading, Text, Link, Badge, Stack } from '@chakra-ui/react';

function JobCard({ company, vacancy, location, salary, skills, link }) {
    return (
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="6" mb="4" boxShadow="md" bg="white" maxW="850px" w="100%">
            <Stack spacing={3}>
                <Heading as="h3" size="lg" color="blue.600">{vacancy}</Heading>
                <Text fontSize="lg" color="gray.700"><strong>Компания:</strong> {company}</Text>
                <Text fontSize="md" color="gray.600"><strong>Местоположение:</strong> {location}</Text>
                {salary && <Badge colorScheme="green" fontSize="0.9em">{salary}</Badge>}
                <Text fontSize="md" color="gray.600"><strong>Навыки:</strong> {skills}</Text>
                <Link href={link} fontSize="md" color="teal.600" fontWeight="bold" isExternal>
                    Подробнее
                </Link>
            </Stack>
        </Box>
    );
}

export default JobCard;
