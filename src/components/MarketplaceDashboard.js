import React, { useState, useEffect } from "react";
import {
  Typography,
  Select,
  MenuItem,
  FormControl,
  Button,
  CircularProgress,
  Paper,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import apiClient from "../api/apiClient";
import "../styles/MarketplaceDashboard.css";

const MarketplaceDashboard = () => {
  const [articles, setArticles] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [selectedArticles, setSelectedArticles] = useState([]);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [loading, setLoading] = useState({ articles: false, sellers: false });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const fetchData = async (endpoint, setData, loadingKey, dataKey) => {
    setLoading((prev) => ({ ...prev, [loadingKey]: true }));
    try {
      const response = await apiClient.get(endpoint);
      const data = response.data[dataKey] || [];
      setData(data);
    } catch (error) {
      setData([]);
    } finally {
      setLoading((prev) => ({ ...prev, [loadingKey]: false }));
    }
  };

  useEffect(() => {
    fetchData("/Articles", setArticles, "articles", "articulos");
    fetchData("/Sellers", setSellers, "sellers", "vendedores");
  }, []);

  const handleSellerChange = (event) => {
    setSelectedSeller(event.target.value);
  };

  const handleArticleToggle = (article) => {
    setSelectedArticles((prev) => {
      if (prev.some((a) => a.codigo === article.codigo)) {
        return prev.filter((a) => a.codigo !== article.codigo);
      } else {
        return [...prev, article];
      }
    });
  };

  const handleSubmit = async () => {
    if (!selectedArticles.length || !selectedSeller) return;

    setSubmitLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const payload = {
        vendedor: selectedSeller.id,
        articulos: selectedArticles.map((article) => article.codigo),
      };

      const response = await apiClient.post("/PurchaseOrders", payload);

      setModalTitle("Éxito");
      setModalMessage(response.data.message);
      setModalOpen(true);
    } catch (error) {
      setModalTitle("Error");
      setModalMessage(
        error.response?.data?.error || "Hubo un error al enviar la orden."
      );
      setModalOpen(true);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    if (modalTitle === "Éxito") {
      setSelectedSeller(null);
      setSelectedArticles([]);
    }
  };

  const isSubmitEnabled = selectedArticles.length > 0 && selectedSeller;

  const validArticles = articles
    .filter((article) => {
      const hasValidPrice = article.precio > 0;
      const isFromDeposito1 = article.deposito === 1;
      const hasValidDescription = /^[a-zA-Z0-9\s]+$/.test(article.descripcion);
      return hasValidPrice && isFromDeposito1 && hasValidDescription;
    })
    .reduce((uniqueArticles, currentArticle) => {
      const isDuplicate = uniqueArticles.some(
        (article) => article.codigo === currentArticle.codigo
      );
      if (!isDuplicate) {
        uniqueArticles.push(currentArticle);
      }
      return uniqueArticles;
    }, []);

  return (
    <div className="marketplace-dashboard">
      <Typography variant="h4" gutterBottom>
        Crear Orden de Compra
      </Typography>
      <Paper elevation={3} className="vendor-selector">
        <FormControl fullWidth disabled={loading.sellers}>
          {/* Título fijo encima del selector */}
          <Typography variant="subtitle1" sx={{ marginBottom: "8px", fontWeight: "bold" }}>
            Seleccionar Vendedor
          </Typography>
          <Select 
            value={selectedSeller || ""} 
            onChange={handleSellerChange}
          >
            {loading.sellers ? (
              <MenuItem disabled>Cargando...</MenuItem>
            ) : (
              sellers.map((seller) => (
                <MenuItem key={seller.id} value={seller}>
                  {seller.descripcion}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>
      </Paper>
      <Paper elevation={3} className="articles-list">
        <Typography variant="h5">Seleccionar Artículos</Typography>
        {loading.articles ? (
          <CircularProgress />
        ) : (
          <FormGroup>
            {validArticles.map((article) => (
              <FormControlLabel
                key={article.codigo}
                control={
                  <Checkbox
                    checked={selectedArticles.some(
                      (a) => a.codigo === article.codigo
                    )}
                    onChange={() => handleArticleToggle(article)}
                  />
                }
                label={`${article.descripcion} - $${article.precio}`}
              />
            ))}
          </FormGroup>
        )}
      </Paper>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={!isSubmitEnabled || submitLoading}
      >
        {submitLoading && (
          <CircularProgress size={16} style={{ marginRight: 8, color: "white" }} />
        )}
        {submitLoading ? "Enviando..." : "Guardar Pedido"}
      </Button>
      <Dialog open={modalOpen} onClose={handleCloseModal} maxWidth="lg" sx={{
          "& .MuiPaper-root": {
            width: "20%", 
            height: "25%",
            borderRadius: "5px",
            textAlign: "center", 
            padding: "20px", 
          },
        }}>
       <DialogTitle className="modal-title" sx={{ fontSize: "2rem", textAlign: "center" }}>
          {modalTitle}
        </DialogTitle>
        <DialogContent>
          <Typography className="modal-message" sx={{fontSize: "2rem", margin: "20px 0", textAlign: "center" }}>
            {modalMessage}
          </Typography>
        </DialogContent>
        <DialogActions className="modal-actions">
          <Button onClick={handleCloseModal} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MarketplaceDashboard;
