import React, { useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent, DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import apiClient from '../api/apiClient';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';

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

  const validArticles = articles
    .filter((article) => article.deposito === 1)
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
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: 2,
        }}
      >
        <FormControl>
          <FormLabel htmlFor="articlesSelect">Seleccionar Artículos</FormLabel>
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
                  label={`${article.descripcion} AR$${article.precio}`}
                />
              ))}
            </FormGroup>
          )}
        </FormControl>
        <FormControl variant="filled" margin={"dense"}>
          <InputLabel id="selectSellerLabel">Seleccionar Vendedor</InputLabel>
          <Select
            fullWidth
            labelId="selectSellerLabel"
            id="sellerSelect"
            label="Seleccionar Vendedor"
            value={selectedSeller}
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
