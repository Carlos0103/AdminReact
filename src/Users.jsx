import { useEffect, useState } from "react";
import api from "./axiosApi";
import TableUsers from "./TableUsers";
import NoUsers from "./NoUsers";
import Loading from "./Loading";
import ModalConfirm from "./ModalConfirm";

const Users = () => {
    const [users, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUserId, setSelectedUserId] = useState(0);

    const loadUsers = () =>{
        setLoading(true);
        const usersEndpoint = "obter_usuarios";
        api.get(usersEndpoint)
            .then((response) => {
                setUsuarios(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                setLoading(false);
            })
        }
        
        useEffect(() => {
            loadUsers();
        }, []);

        const deleteUser = (userId) => {
            setLoading(true);
            console.log("Entrou no método deleteUser")
            api.post('excluir_usuario', {
                id_usuario : userId
                })
                .then(response => {
                    if (response.status === 204)
                        loadUsers();
                })
                .catch(error => {
                    console.error('Erro ao remover o usuário:', error);
                })
                .finally(() => {
                    setLoading(false);
                });
        };

        const handleDeleteUser = (userId) => {
            setSelectedUserId(userId)
            const modal = new bootstrap.Modal(document.getElementById('modalDeleteUser'));
            modal.show();
        }

    return (
        <>
            {users.length > 0 ?
                <TableUsers items={users} handleDeleteUser={handleDeleteUser}/> :
                (!loading && <NoUsers />)}
            {loading && <Loading />}

            <ModalConfirm modalId="modalDeleteUser" question="Deseja realmente remover o usuário?" confirmAction={() => deleteUser(selectedUserId)}/>
        </>
    );
};

export default Users