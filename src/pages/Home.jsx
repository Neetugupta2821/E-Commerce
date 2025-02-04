import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  Pagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  Slider,
  List,
  ListItem,
  ListItemText,
  Divider,
  Drawer,
  Skeleton,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useCart } from "../contexts/CartContext";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error))
      .finally(() => setLoading(false));

    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchTerm(query);
    filterProducts(query, selectedCategory, priceRange);
  };

  const filterProducts = (searchQuery, category, priceRange) => {
    let filtered = products.filter((product) => {
      const isTitleMatch = product.title.toLowerCase().includes(searchQuery);
      const isCategoryMatch = category ? product.category === category : true;
      const isPriceMatch =
        product.price >= priceRange[0] && product.price <= priceRange[1];

      return isTitleMatch && isCategoryMatch && isPriceMatch;
    });
    setFilteredProducts(filtered);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    filterProducts(searchTerm, category, priceRange);
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
    filterProducts(searchTerm, selectedCategory, newValue);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const indexOfLastProduct = page * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <Container sx={{ py: 4 }}>
      <Drawer
        sx={{
          width: 250,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 250,
            boxSizing: "border-box",
            backgroundColor: "white",
          },
        }}
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ padding: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Filter Products
          </Typography>

          <Typography variant="subtitle1">Categories</Typography>
          <List>
            <ListItem button onClick={() => handleCategoryClick("")}>
              <ListItemText primary="All Categories" />
            </ListItem>
            <Divider sx={{ my: 1 }} />
            {categories.map((category) => (
              <ListItem
                button
                key={category}
                onClick={() => handleCategoryClick(category)}
              >
                <ListItemText primary={category} />
              </ListItem>
            ))}
          </List>

          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Price Range: ${priceRange[0]} - ${priceRange[1]}
          </Typography>
          <Slider
            value={priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `$${value}`}
            min={0}
            max={200}
            sx={{ mt: 1 }}
          />
        </Box>
      </Drawer>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <IconButton
          color="primary"
          onClick={() => setDrawerOpen(true)}
          sx={{ backgroundColor: "#fff", borderRadius: 2 }}
        >
          <FilterListIcon />
        </IconButton>

        <Box sx={{ flexGrow: 1, ml: 2 }}>
          <TextField
            label="Search Products"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearch}
            sx={{
              maxWidth: "400px",
              backgroundColor: "#fff",
              borderRadius: 1,
            }}
          />
        </Box>
      </Box>

      <Grid container spacing={4}>
        {loading
          ? Array.from(new Array(8)).map((_, index) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                <Card sx={{ maxWidth: 345, height: "100%" }}>
                  <Skeleton variant="rectangular" height={200} />
                  <CardContent>
                    <Skeleton width="80%" />
                    <Skeleton width="60%" />
                  </CardContent>
                </Card>
              </Grid>
            ))
          : filteredProducts
              .slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                  <Card
                    sx={{
                      maxWidth: 345,
                      height: "100%",
                      cursor: "pointer",
                      boxShadow: 3,
                      transition: "0.3s",
                      "&:hover": {
                        boxShadow: 6,
                      },
                    }}
                    onClick={() => openModal(product)}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={product.image}
                      alt={product.title}
                      sx={{ objectFit: "contain", p: 2 }}
                    />
                    <CardContent>
                      <Typography variant="h6" noWrap>
                        {product.title}
                      </Typography>
                      <Typography variant="body1">${product.price}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          count={Math.ceil(filteredProducts.length / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>

      <Dialog open={modalOpen} onClose={closeModal} maxWidth="md" fullWidth>
        <DialogTitle>{selectedProduct?.title}</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={selectedProduct?.image}
              alt={selectedProduct?.title}
              style={{
                width: "200px",
                objectFit: "contain",
                marginBottom: "16px",
              }}
            />
            <Typography variant="h6">
              Price: ${selectedProduct?.price}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              {selectedProduct?.description}
            </Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Category: {selectedProduct?.category}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Rating: {selectedProduct?.rating.rate} (
              {selectedProduct?.rating.count} reviews)
            </Typography>
            {/* Add to Cart Button */}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  addToCart(selectedProduct);
                  closeModal(); // Close the modal after adding to cart
                }}
              >
                Add to Cart
              </Button>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Home;
