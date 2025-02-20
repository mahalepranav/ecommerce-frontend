import React from 'react';
import CategoryList from '../components/CategoryList';
import BannerProduct from '../components/BannerProduct';
import HorizontalCardProduct from '../components/HorizontalCardProduct';
import VerticalCardProduct from '../components/VerticalCardProduct';

const Home = () => {
  return (
    
    <div>
      <CategoryList/>
      <BannerProduct/>
      <HorizontalCardProduct category={"diaries"} heading={"Diaries"}/>
      <HorizontalCardProduct category={"notebooks"} heading={"Notebooks"}/>
      <VerticalCardProduct category={"calculators"} heading={"Calculators"}/>
      <VerticalCardProduct category={"study tables"} heading={"Study Tables"}/>
      <VerticalCardProduct category={"pen & pencils"} heading={"Pen & Pencils"}/>
      <VerticalCardProduct category={"color & paints"} heading={"Color & Paints"}/>
      <VerticalCardProduct category={"geometry sets"} heading={"Geometry Sets"}/>
      <VerticalCardProduct category={"sketch books"} heading={"Sketch Books"}/>
      <VerticalCardProduct category={"paint brushes"} heading={"Paint Brushes"}/>
      <VerticalCardProduct category={"other accessories"} heading={"Other Accessories"}/>
      <VerticalCardProduct category={"college bags"} heading={"College Bags"}/>
    </div>
    
  )
}

export default Home;