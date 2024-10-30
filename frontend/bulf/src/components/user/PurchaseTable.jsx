import { useEffect, useState } from 'react';
import { useUser } from './UserContext';
import './PurchaseTable.css';


function PurchaseTable() {
    const { token, user } = useUser();
    const [purchases, setPurchases] = useState([]);

    useEffect(() => {
        const fetchPurchases = async () => {
            if (!user || !user.email) {
                console.error("No se encontró el email del usuario.");
                return;
            }
            try {
                const response = await fetch(`http://localhost:8080/api/auth/user/purchase?email=${user.email}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!response.ok) throw new Error("Error al obtener las compras");
                
                const data = await response.json();
                setPurchases(data);
            } catch (error) {
                console.error("Error fetching purchases:", error);
            }
        };

        fetchPurchases();
    }, [token, user]);

    return (
        <div className="purchase-container">
        <h2>Lista de Compras</h2>
        <table className="purchase-table">
            <thead>
                <tr>
                    <th>ID de Pago</th>
                    <th>Status</th>
                    <th>Productos</th>
                    <th>Costo Total</th>
                </tr>
            </thead>
            <tbody>
                {purchases.map((purchase, index) => (
                    <tr key={index}>
                        <td>{purchase.paymentId}</td>
                        <td>{purchase.status}</td>
                        <td>
                            <ul className="products-list">
                                {purchase.products.map((product) => (
                                    <li key={product.id}>
                                        {product.name} - ${product.price}
                                    </li>
                                ))}
                            </ul>
                        </td>
                        <td className="total-cost">${purchase.totalCost.toFixed(2)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    
    );
}

export default PurchaseTable;
