import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const SellerSelector = ({ sellers, selectedSeller, onSellerChange, loading }) => {
  return (
    <FormControl variant="filled" margin="dense" fullWidth>
      <InputLabel id="selectSellerLabel">Seleccionar Vendedor</InputLabel>
      <Select
        labelId="selectSellerLabel"
        id="sellerSelect"
        value={selectedSeller}
        onChange={onSellerChange}
      >
        {loading ? (
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
  );
};

export default SellerSelector;
