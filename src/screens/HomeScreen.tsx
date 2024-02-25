import React, {useEffect, useState, useCallback, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {observer} from 'mobx-react';
import productStore from '../store/ProductStore';
import {Category, Product} from '../types';
import ProductItem from '../components/ProductItem';
import Loader from '../components/Loader';
import Colors from '../assets/Colors';
import {FlashList} from '@shopify/flash-list';
import CategoryItem from '../components/CategoryItem';

const HomeScreen = observer(() => {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([
    {title: 'All', id: 0},
  ]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await productStore.fetchProducts();
        if (products) {
          const tempCategories = products.flatMap(item =>
            item.categories.map(val => ({id: val.id, title: val.title})),
          );
          const uniqueCategories = Array.from(
            new Map(tempCategories.map(item => [item.id, item])).values(),
          );
          uniqueCategories.sort((a, b) => (a.title > b.title ? 1 : -1));
          setCategories(prevCategories => [
            ...prevCategories,
            ...uniqueCategories,
          ]);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const onCategoryClick = (id: number) => {
    setSelectedCategoryId(id);
  };

  const renderCategoryItem = ({
    item,
    index,
  }: {
    item: Category;
    index: number;
  }) => (
    <CategoryItem
      item={item}
      key={index}
      onCategoryClick={() => onCategoryClick(item.id)}
      isSelected={selectedCategoryId === item.id}
    />
  );

  const renderProductItem = ({item}: {item: Product}) => (
    <ProductItem item={item} />
  );

  const filteredProducts = useMemo(
    () =>
      productStore.products.filter(
        item =>
          selectedCategoryId === 0 ||
          item.categories.some(category => category.id === selectedCategoryId),
      ),
    [selectedCategoryId, productStore.products],
  );

  if (isLoading) return <Loader />;

  return (
    <View style={styles.container}>
      <FlashList
        renderItem={renderCategoryItem}
        estimatedItemSize={100}
        data={categories}
        horizontal
        contentContainerStyle={styles.categoryListContainer}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
      />
      <FlashList
        estimatedItemSize={200}
        data={filteredProducts}
        renderItem={renderProductItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.productListContainer}
        numColumns={2}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.green,
    paddingTop: 16,
  },
  categoryListContainer: {
    paddingLeft: 16,
    paddingBottom: 16,
  },
  productListContainer: {
    paddingHorizontal: 8,
  },
});

export default HomeScreen;
