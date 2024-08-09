import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Prices } from '../../Prices';
import Card from '../../Card';
import Loader from '../../Loader';

const HomepageProductsFilteringSection = () => {
  const [products, setProducts] = useState([]);
  const [buttonVisible, setButtonVisible] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState('');
  //get all cat
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
  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    getAllCategory();
  }, []);
  useEffect(() => {
    getTotal();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get('/api/v1/product/product-count');
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
    // eslint-disable-next-line
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
    // eslint-disable-next-line
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
    // eslint-disable-next-line
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post('/api/v1/product/product-filters', {
        checked,
        radio,
      });
      setLoading(false);
      setProducts(data?.products);
      setButtonVisible(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex relative gap-2 mt-3">
        {/* Filter section */}
        <div className="py-2 rounded-xl h-screen sticky top-[70px] flex-col">
          <div className="flex flex-row form-control">
            {/* category-filter */}
            <div className="w-72 flex font-serif bg-gradient-to-tr from-blue-300 from-10% via-sky-300 via-30% to-green-200 to-100% flex-col glass px-8 py-2 rounded-xl">
              <h4 className="py-2 text-center text-2xl flex justify-center font-semibold">
                Filter By Category</h4>
              {categories?.map((c, i) => (
                <label key={i} className="label cursor-pointer">
                  <span className="label-text font-medium">{c.name} </span>
                  <input type="checkbox" className="checkbox checkbox-xs checkbox-secondary" onChange={(e) => handleFilter(e.target.checked, c._id)} />
                </label>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <button
              className="btn btn-accent m-2"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
          {/* price-filter */}
          <div className='w-72 font-serif bg-gradient-to-tr from-blue-300 from-10% via-sky-300 via-30% to-green-200 to-100% flex gap-2 flex-col justify-evenly glass py-2 px-2 rounded-xl' onChange={(e) => {
            setRadio(Prices[e.target.value].array)
          }}>
            <h4 className="text-center text-2xl font-semibold">Filter By Price</h4>
            {Prices?.map((p) => (
              <div className='flex justify-between px-4' key={p._id}>
                <label className='font-medium'>{p.name}</label>
                <input type="radio" value={p._id} className="radio-xs radio radio-secondary mx-4" checked={radio === p.array} onChange={(e) => setRadio(e.target.value)} />
              </div>
            ))}
          </div>
        </div>
        {/* Products section */}

        <div className="glass py-2 px-2 rounded-xl">
          <h1 className="text-center text-3xl font-semibold py-8">All Products</h1>
          {loading ? <Loader message={'Loading Products...'} /> : <>
            <div className="flex flex-wrap justify-evenly gap-2">
              {
                products.map((p) => (
                  <Card key={p._id} product={p} />
                ))
              }
            </div>
            <div className="m-2 p-3">
              {products && products.length < total && (
                <button
                  className="btn btn-warning"
                  style={{ display: buttonVisible ? 'block' : 'none' }}
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? 'Loading ...' : 'Load More'}
                </button>
              )}
            </div>
          </>
          }
        </div>
      </div>
    </>
  );
};

export default HomepageProductsFilteringSection;
