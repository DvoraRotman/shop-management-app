import React from 'react';

// MUI
import { Container, Typography, Button, Stack } from '@mui/material';

const Error = () => {

    // Function to refresh the page
    const refresh = () => {
        console.debug('Refreshing the page...');
        window.location.reload();
    };

    return (
        <Stack
            display="flex"
            flexDirection="column"
            height="100vh"
            textAlign="center"
            justifyContent="center"
            sx={{
                backgroundColor: (theme) => theme.palette.custom?.errorBg || '#e4f5ff',
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100vh',
                width: '100vw',
            }}
        >
            <Container maxWidth="md">
                <Typography
                    align="center"
                    variant="h2"
                    sx={{
                        pt: 2,
                        color: (theme) => theme.palette.text.primary,
                    }}
                >
                    שגיאה
                </Typography>

                <Typography
                    align="center"
                    variant="h4"
                    sx={{
                        pt: 1,
                        color: (theme) => theme.palette.text.primary,
                    }}
                >
                   דף זה לא נמצא
                </Typography>

                <Typography
                    align="center"
                    variant="h6"
                    sx={{
                        pb: 3,
                        color: (theme) => theme.palette.text.secondary,
                    }}
                >
                    אנא נסה שוב או פנה לתמיכה.
                </Typography>

                <Stack direction={'row'} spacing={1} width='100%' justifyContent="center">
                    <Button
                        variant="contained"
                        onClick={refresh}
                        disableElevation
                        sx={{
                            backgroundColor: (theme) => theme.palette.common.black,
                            color: (theme) => theme.palette.common.white,
                            borderRadius: '8px',
                            '&:hover': {
                                backgroundColor: (theme) => theme.palette.grey[100],
                                color: (theme) => theme.palette.text.primary,
                            },
                        }}
                    >
                        נסה שוב
                    </Button>
                </Stack>
            </Container>
        </Stack>
    );
};

export default Error;
