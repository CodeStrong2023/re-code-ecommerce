import { useEffect, useState } from "react";
import { useUser } from "../user/UserContext";
import "./AdminPurchaseTable.css";

function AdminPurchaseTable() {
  const { token } = useUser();
  const [purchases, setPurchases] = useState([]);
  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/auth/admin/purchase`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) throw new Error("Error al obtener las compras");
        const data = await response.json();
        setPurchases(data);
      } catch (error) {
        console.error("Error fetching purchases:", error);
      }
    };
    fetchPurchases();
  }, [token]);
  return (
    <div className="purchase-container2">
      <h2 className="title">Lista de Compras Administrativas</h2>
      <table className="purchase-table">
        <thead>
          <tr>
            <th>ID de Pago</th>
            <th>Status</th>
            <th>Usuario ID</th>
            <th>Email del Usuario</th>
            <th>Nombre del Usuario</th>
            <th>Productos</th>
            <th>Costo Total</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((purchase, index) => (
            <tr key={index}>
              <td>{purchase.paymentId}</td>
              <td>{purchase.status}</td>
              <td>{purchase.userId}</td>
              <td>{purchase.userEmail}</td>
              <td>{purchase.userName}</td>
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

export default AdminPurchaseTable;
