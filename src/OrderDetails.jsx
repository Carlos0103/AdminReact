import React, { useEffect } from "react";
import api from './axiosApi';

const OrderDetails = ({orderId}) => {
    const [order, setOrder] = useState(null);

    useEffect(() => {
        api.get('obter_pedido_por_id/${orderId}')
            .then(response => {
                setOrder(response.data);
            })
            .catch(error => {
                console.error('Erro ao carregar pedido:', erro);
            });
    }, [orderId]);

    return (
        <>
            <h1 className="display-6">Detalhes de Pedido</h1>
            <hr />
            <div className="card">
                <p className="m-0">
                    <b>Código do Pedido: </b> {order.id}
                    <b>Data do Pedido: </b> {order.data_hora} <br />
                    <b>Valor Total: </b> {order.valor_total} <br />
                    <b>Estado: </b> {order.estado}
                </p>
                <p className="m-0">
                    <b>Cliente: </b> {order.cliente.nome}
                </p>
                <table className="table table-striped table-sm">
                    
                    <tr>
                        <th>Produto</th>
                        <th>Valor Unit.</th>
                        <th>Qtde</th>
                        <th>Valor Item</th>
                    </tr>
                    {order.itens.map(item =>
                        <tr>
                            <td>item.nome_produto</td>
                            <td>item.valor_produto</td>
                            <td>item.quantidade</td>
                            <td>item.valor_item</td>
                        </tr>
                    )}
                </table>
            </div>
        </>
    )
};

export default OrderDetails;