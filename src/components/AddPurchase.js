import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import apiClient from '../api/apiClient';
import SellerSelector from './SellerSelector';
import ArticleSelector from './ArticleSelector';

const AddPurchase = () => {
  const [articles, setArticles] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [selectedArticles, setSelectedArticles] = useState([]);
  const [selectedSeller, setSelectedSeller] = useState("");
  const [loading, setLoading] = useState({ articles: false, sellers: false });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

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
    setSubmitLoading(true);
    setTimeout(async () => {
      try {
        const payload = {
          vendedor: selectedSeller.id,
          articulos: selectedArticles.map(({ codigo }) => codigo),
        };

        const response = await apiClient.post("/PurchaseOrders", payload);
        setModalMessage(response.data.message);
        setModalOpen(true);
      } catch (error) {
        setModalMessage(
          error.response?.data?.error || "Hubo un error al enviar la orden."
        );
        setModalOpen(true);
      } finally {
        setSubmitLoading(false);
      }
    }, 3000);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedSeller("");
    setSelectedArticles([]);
  };

  const isSubmitEnabled = selectedArticles.length > 0 && selectedSeller;

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: 2,
        }}
      >
        <ArticleSelector
          articles={articles}
          selectedArticles={selectedArticles}
          onToggleArticle={handleArticleToggle}
          loading={loading.articles}
        />
        <SellerSelector
          sellers={sellers}
          selectedSeller={selectedSeller}
          onSellerChange={handleSellerChange}
          loading={loading.sellers}
        />
        <Button
          variant="contained"
          color={!isSubmitEnabled ? "error" : "primary"}
          fullWidth
          onClick={handleSubmit}
          disabled={!isSubmitEnabled || submitLoading}
        >
          {submitLoading ? <CircularProgress size={16} /> : "Crear Pedido"}
        </Button>
      </Box>
      <Dialog open={modalOpen} onClose={handleCloseModal}>
        <DialogTitle>
          Creación de Orden de Compra
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {modalMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddPurchase;
