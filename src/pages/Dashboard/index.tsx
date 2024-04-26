'use client'

import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Checkbox from '@mui/material/Checkbox';

import Nav from '../Nav';
import api from '../../api';
import { Container, Content, TableBody, Title } from './styles';
import CreateWorker from '../CreateWorker';
import { Skeleton, Stack } from '@mui/material';

const Dashboard: React.FC = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [workerId, setWorkerId] = useState<any>("");
    const [workers, setWorkers] = useState<any>();

    const [selectedWorker, setSelectedWorker] = useState<any>(null);
    const [filteredWorkers, setFilteredWorkers] = useState<any>(workers || []);
    const [searchTrigger, setSearchTrigger] = useState<boolean>(false);

    const [successDelete, setSuccessDelete] = useState(false);

    const handleAutocompleteChange = (event: React.ChangeEvent<any>, value: any) => {
        console.log(value);
        if (value === null) {
            setFilteredWorkers(workers);
        }
        if (value) {
            setSelectedWorker(value);
        }
    };

    function handleSearch(value: any) {
        console.log('handlesearch: ', value);
        if (value) {
            const nomeCompleto = value.label.split(' ')[0];
            const filtered = workers.filter((worker: any) => worker.nome.includes(nomeCompleto));
            console.log('filtro: ', filtered);
            setFilteredWorkers(filtered);
        } else {
            setFilteredWorkers(workers);
        }
    }


    useEffect(() => {
        const fetchWorkers = async () => {
            try {
                const response = await api.get('/onsafety-api/api/v2/trabalhadores');
                const data: any = response.data.content;
                setWorkers(data);
            } catch (error) {
                console.error('Erro ao buscar trabalhadores:', error);
            }
        };

        fetchWorkers();
    }, []);

    function handleEdit(id: any) {
        setWorkerId(id);
        setOpen(true);
    }

    async function handleDelete(id: any) {
        try {
            await api.delete(`/onsafety-api/api/v2/trabalhadores/${id}`);
            setSuccessDelete(true);
            toast.success('Trabalhador excluído com sucesso! Dados continuam na base!', {
                position: 'top-right'
            });

        } catch (error) {
            console.error('Erro ao deletar trabalhador:', error);
        }
    }

    const columns: GridColDef<any>[] = [
        {
            field: 'nome',
            headerName: 'Nome',
            width: 350,
            editable: true,
            headerAlign: 'center',
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 250,
            editable: true,
            headerAlign: 'center',
        },
        {
            field: 'cpf',
            headerName: 'CPF',
            type: 'number',
            width: 150,
            editable: true,
            headerAlign: 'center',
        },
        {
            field: 'matricula',
            headerName: 'Matrícula',
            width: 200,
            headerAlign: 'center',
            editable: true,
        },
        {
            field: 'formacao',
            headerName: 'Formação',
            type: 'number',
            width: 300,
            headerAlign: 'center',
            editable: true,
        },
        {
            field: 'Editar',
            headerName: 'Alterar',
            headerAlign: 'center',
            width: 110,
            editable: true,
            renderCell: (params: any) => (
                <Button
                    variant="contained"
                    size="small"
                    sx={
                        {
                            backgroundColor: '#515151',
                            "&:hover": {
                                backgroundColor: "#c1c1c1"
                            },
                            "&:active": {
                                backgroundColor: "#c1c1c1"
                            }
                        }
                    }
                    style={{ marginLeft: 16 }}
                    tabIndex={params.hasFocus ? 0 : -1}
                    onClick={() => handleEdit(params.id)}
                >
                    Editar
                </Button>
            ),
        },
        {
            field: 'inativar',
            headerName: 'Inativar',
            width: 120,
            headerAlign: 'center',
            editable: true,
            renderCell: (params: any) => (
                <Button
                    variant="contained"
                    size="small"
                    color='error'
                    style={{ marginLeft: 16 }}
                    tabIndex={params.hasFocus ? 0 : -1}
                    onClick={() => handleDelete(params.id)}
                >
                    Inativar
                </Button>
            ),
        },
    ];

    function handleNewWorker() {
        handleOpen();
        setWorkerId("");
    }

    useEffect(() => {
        if (searchTrigger) {
            handleSearch(selectedWorker);
            setSearchTrigger(false);
        }
    }, [searchTrigger, selectedWorker]);

    return (
        <>
            {
                workers > [] ? <>
                    <ToastContainer />
                    <Nav />
                    <Container>
                        <Title>
                            <h1>Lista de trabalhadores</h1>
                        </Title>
                        <Content>
                            <Button
                                variant="contained"
                                sx={
                                    {
                                        backgroundColor: '#92BF21',
                                        marginRight: '10px',
                                        "&:hover": {
                                            backgroundColor: "#92BF21"
                                        },
                                        "&:active": {
                                            backgroundColor: "#92BF21"
                                        }
                                    }
                                }
                                onClick={handleNewWorker}>Novo</Button>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={workers ? workers.map((item: any) => ({
                                    label: `${item.nome} (${item.email})`,
                                    year: item.id
                                })) : []}
                                sx={{ width: 300 }}
                                onChange={handleAutocompleteChange}
                                renderInput={(params) => <TextField {...params} label="Todos" />}
                            />
                            <Button
                                variant="contained"
                                onClick={() => setSearchTrigger(true)}
                                sx={
                                    {
                                        backgroundColor: '#92BF21',
                                        marginLeft: '10px',
                                        "&:hover": {
                                            backgroundColor: "#92BF21"
                                        },
                                        "&:active": {
                                            backgroundColor: "#92BF21"
                                        }
                                    }
                                }
                            >Listar
                            </Button>
                        </Content>
                        <Content>
                            <FormControl>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value="Trabalhadores" control={<Radio sx={{ '&, &.Mui-checked': { color: '#92BF21', } }} />} label="Trabalhadores" />
                                    <FormControlLabel value="Instrutores" control={<Radio sx={{ '&, &.Mui-checked': { color: '#92BF21', } }} />} label="Instrutores" />
                                    <FormControlLabel value="Médicos" control={<Radio sx={{ '&, &.Mui-checked': { color: '#92BF21', } }} />} label="Médicos" />
                                    <FormControlLabel control={<Checkbox defaultChecked sx={{ '&, &.Mui-checked': { color: '#92BF21', } }} />} label="Mostrar invativos" />
                                </RadioGroup>
                            </FormControl>
                        </Content>

                        {
                            workers && <TableBody>
                                <Box sx={{ height: 400, width: '97%' }}>
                                    <DataGrid
                                        rows={filteredWorkers > [] ? filteredWorkers : workers}
                                        columns={columns}
                                        initialState={{
                                            pagination: {
                                                paginationModel: {
                                                    pageSize: 5,
                                                },
                                            },
                                        }}
                                        pageSizeOptions={[5]}
                                        disableRowSelectionOnClick
                                        sx={{ alignContent: 'center' }}
                                        localeText={{
                                            MuiTablePagination: {
                                                labelDisplayedRows: ({ from, to, count }) =>
                                                    `${from} - ${to} de ${count === -1 ? `mais de ${to}` : count}`,
                                            },
                                        }}
                                    />
                                </Box>
                            </TableBody>
                        }
                    </Container>
                    <CreateWorker open={open} handleClose={handleClose} workerId={workerId} />
                </> : <>
                    <Stack spacing={1}>
                        <Skeleton variant="rectangular" width={'100%'} height={70} animation="wave" />
                        <Skeleton variant="rounded" width={300} height={40} animation="wave" /> 
                        <Skeleton variant="rounded" width={500} height={100} animation="wave" />
                        <Skeleton variant="rounded" width={550} height={30} animation="wave" />
                        <Skeleton variant="rounded" width={'100%'} height={500} animation="wave" />
                    </Stack>
                </>
            }

        </>
    );
};

export default Dashboard;
