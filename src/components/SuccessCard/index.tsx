import { Button } from "@mui/material";
import { Container } from "./styles";

interface SuccessCardProps {
    edit: boolean;
    handleClose: () => void;
}

export default function SuccessCard({ edit, handleClose }: SuccessCardProps) {
    function handleCloseModal() {
        handleClose();
        window.location.reload();
    }
    return (
        <Container>
            <img src="https://fcs3pub.s3.amazonaws.com/photo-book/images/payment/success.gif" alt="GIF animado" />
            {
                edit ? <h3>Trabalhador editado com sucesso!</h3> : <h3>Trabalhador cadastrado com sucesso!</h3>
            }
            <Button
                onClick={handleCloseModal}
                variant='contained'
                sx={{
                    backgroundColor: '#92BF21',
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
                Fechar
            </Button>
        </Container>
    );
}