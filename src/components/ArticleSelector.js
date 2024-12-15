import React from 'react';
import { FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox, CircularProgress } from '@mui/material';

const ArticleSelector = ({ articles, selectedArticles, onToggleArticle, loading }) => {
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
    <FormControl>
      <FormLabel htmlFor="articlesSelect">Seleccionar Artículos</FormLabel>
      {loading ? (
        <CircularProgress />
      ) : (
        <FormGroup>
          {validArticles.map((article) => (
            <FormControlLabel
              key={article.codigo}
              control={
                <Checkbox
                  checked={selectedArticles.some((a) => a.codigo === article.codigo)}
                  onChange={() => onToggleArticle(article)}
                />
              }
              label={`${article.descripcion} AR$${article.precio}`}
            />
          ))}
        </FormGroup>
      )}
    </FormControl>
  );
};

export default ArticleSelector;
