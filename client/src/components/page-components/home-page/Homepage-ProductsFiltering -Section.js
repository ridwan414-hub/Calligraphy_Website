import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Prices } from '../../Prices';
import Card from '../../Card';
import Loader from '../../Loader';
import Skeleton from '../../Skeleton';

const HomepageProductsFilteringSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const productsPerPage = 3; // Adjust this value based on your API's response

  useEffect(() => {
    getAllCategory();
    getTotal();
    getAllProducts();
  }, []);

  useEffect(() => {
    if (page > 1) {
      loadMore();
    }
  }, [page]);

  useEffect(() => {
    if (checked.length || radio.length) {
      filterProduct();
    } else {
      getAllProducts();
    }
  }, [checked, radio]);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get('/api/v1/category/get-categories');
      if (data?.success) {
        setCategories(data?.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  const getTotal = async () => {
    try {
      const { data } = await axios.get('/api/v1/product/product-count');
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
      setHasMore(data.products.length >= productsPerPage);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const loadMore = async () => {
    if (loadingMore) return;
    try {
      setLoadingMore(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoadingMore(false);
      setProducts([...products, ...data?.products]);
      setHasMore(data.products.length >= productsPerPage);
    } catch (error) {
      setLoadingMore(false);
      console.log(error);
    }
  };

  const filterProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post('/api/v1/product/product-filters', {
        checked,
        radio,
      });
      setLoading(false);
      setProducts(data?.products);
      setHasMore(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row relative gap-4 mt-3">
      {/* Filter section */}
      <div className="lg:w-1/4 w-full py-2 rounded-xl lg:sticky top-[70px]">
        <div className="flex flex-col lg:flex-row lg:w-full form-control">
          {/* category-filter */}
          <div className="w-full lg:w-full bg-gradient-to-tr from-blue-300 from-10% via-sky-300 via-30% to-green-200 to-100% flex flex-col px-6 py-4 rounded-xl glass">
            <h4 className="py-2 text-center text-2xl font-semibold">
              Filter By Category
            </h4>
            {categories?.map((c) => (
              <label key={c._id} className="label cursor-pointer">
                <span className="label-text">{c.name}</span>
                <input
                  type="checkbox"
                  className="checkbox checkbox-xs checkbox-secondary"
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                />
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center my-4">
          <button
            className="btn btn-accent"
            onClick={() => window.location.reload()}
          >
            RESET FILTERS
          </button>
        </div>

        {/* price-filter */}
        <div
          className="w-full lg:w-full bg-gradient-to-tr from-blue-300 from-10% via-sky-300 via-30% to-green-200 to-100% flex flex-col gap-2 px-6 py-4 rounded-xl glass"
          onChange={(e) => setRadio(Prices[e.target.value].array)}
        >
          <h4 className="text-center text-2xl font-semibold">Filter By Price</h4>
          {Prices?.map((p) => (
            <div className="flex justify-between" key={p._id}>
              <label>{p.name}</label>
              <input
                type="radio"
                value={p._id}
                className="radio-xs radio radio-secondary"
                checked={radio === p.array}
                onChange={(e) => setRadio(e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Products section */}
      <div className="glass w-full py-2 px-2 rounded-xl">
        <h1 className="text-center text-3xl font-semibold py-8">
          All Products
        </h1>
        {loading ? (
          <Loader message={'Loading Products...'} />
        ) : (
          <>
            <div className="flex flex-wrap justify-evenly gap-2">
              {products.map((p) => (
                <Card key={p._id} product={p} />
              ))}
              {loadingMore &&
                Array(productsPerPage)
                  .fill(0)
                  .map((_, index) => <Skeleton key={`skeleton-${index}`} />)}
            </div>
            {hasMore && !loadingMore && (
              <div className="m-2 p-3 flex justify-center">
                <button
                  className="btn btn-warning"
                  onClick={() => {
                    setPage((prevPage) => {
                      return prevPage + 1;
                    });
                  }}
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HomepageProductsFilteringSection;
