'use client'

import { useEffect, useState } from 'react';
import api from '../../api';
import { Container, Content, Title } from './styles';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, FormControl, TextField } from '@mui/material';
import SuccessCard from '@/components/SuccessCard';

interface Worker {
    nome: string;
    email: string;
    matricula: string;
    cpf: string;
    formacao: string;
    projeto: { id: string };
}

interface CreateWorkerProps {
    open: boolean;
    handleClose: () => void;
    workerId: string | null;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    borderRadius: '10px',
    p: 4,
};

export default function CreateWorker({ open, handleClose, workerId }: CreateWorkerProps) {
    const [projectId, setProjectId] = useState<any>();
    const [successEdit, setSuccessEdit] = useState(false);
    const [successCreate, setSuccessCreate] = useState(false);

    const [worker, setWorker] = useState<Worker>({
        nome: '',
        email: '',
        matricula: '',
        cpf: '',
        formacao: '',
        projeto: { id: '' }
    });

    useEffect(() => {
        if (workerId) {
            const fetchWorker = async () => {
                try {
                    const response = await api.get(`/onsafety-api/api/v2/trabalhadores/${workerId}`);
                    const data: Worker = response.data;
                    setWorker(data);
                } catch (error) {
                    console.error('Erro ao buscar trabalhador:', error);
                }
            };
            fetchWorker();
        } else {
            setWorker({
                nome: '',
                email: '',
                matricula: '',
                cpf: '',
                formacao: '',
                projeto: { id: '' }
            });
        }
    }, [workerId, projectId]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setWorker(prevWorker => ({
            ...prevWorker,
            [name]: value
        }));
    };

    useEffect(() => {
        const fetchWorkers = async () => {
            try {
                const response = await api.get('/onsafety-api/api/v2/trabalhadores');
                const data: any = response.data.content[0];
                setProjectId(data.projeto.id);
            } catch (error) {
                console.error('Erro ao buscar trabalhadores:', error);
            }
        };
        fetchWorkers();
    }, [projectId]);

    const handleSubmit = async () => {
        if (projectId) {
            try {
                const data = {
                    ...worker,
                    projeto: { id: projectId }
                };

                if (workerId) {
                    await api.put(`/onsafety-api/api/v2/trabalhadores/${workerId}`, data);
                    setSuccessEdit(true);
                } else {
                    console.log('entrou aqui g:')
                    await api.post('/onsafety-api/api/v2/trabalhadores', data);
                    setSuccessCreate(true);
                }
            } catch (error) {
                console.error('Erro ao criar/atualizar trabalhador:', error);
            }
        }
    };

    return (
        <Container>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {
                    successEdit || successCreate ? <Box sx={style}><SuccessCard edit={successEdit} handleClose={handleClose} /></Box> : <Box sx={style}>
                        <Title>
                            {workerId ? 'Editando trabalhador' : 'Adicionando trabalhador'}
                        </Title>
                        <Content>
                            <FormControl>
                                <TextField
                                    name="nome"
                                    value={worker.nome}
                                    onChange={handleInputChange}
                                    id="outlined-basic"
                                    label="Nome"
                                    variant="outlined"
                                    margin="normal"
                                    sx={{ width: '400px' }}
                                />
                                <TextField
                                    name="email"
                                    value={worker.email}
                                    onChange={handleInputChange}
                                    id="outlined-basic"
                                    label="E-mail"
                                    variant="outlined"
                                    margin="normal"
                                />
                                <TextField
                                    name="cpf"
                                    value={worker.cpf}
                                    onChange={handleInputChange}
                                    id="outlined-basic"
                                    label="CPF"
                                    variant="outlined"
                                    margin="normal"
                                />
                                <TextField
                                    name="matricula"
                                    value={worker.matricula}
                                    onChange={handleInputChange}
                                    id="outlined-basic"
                                    label="Matrícula"
                                    variant="outlined"
                                    margin="normal"
                                />
                                <TextField
                                    name="formacao"
                                    value={worker.formacao}
                                    onChange={handleInputChange}
                                    id="outlined-basic"
                                    label="Formação"
                                    variant="outlined"
                                    margin="normal"
                                />
                                <Button
                                    onClick={handleSubmit}
                                    variant='contained'
                                    sx={{
                                        backgroundColor: '#92BF21',
                                        width: '100%',
                                        marginTop: '20px',
                                        height: '60px',
                                        marginRight: '10px',
                                        "&:hover": {
                                            backgroundColor: "#92BF21"
                                        },
                                        "&:active": {
                                            backgroundColor: "#92BF21"
                                        }
                                    }}
                                >
                                    {workerId ? 'Salvar' : 'Adicionar'}
                                </Button>
                            </FormControl>
                        </Content>
                    </Box>
                }
            </Modal>
        </Container>
    );
}

