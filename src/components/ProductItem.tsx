import {FC, memo} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Product} from '../types';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/types';
import ImagePlaceholder from '../assets/icons/image-placeholder.png';
import Colors from '../assets/Colors';
import {formatPrice} from '../utils/PriceHelper';
import FavoriteButton from './FavoriteButton';

type ProductItemProps = {
  item: Product;
};

const ProductItem: FC<ProductItemProps> = ({item}) => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'Home'>>();

  const onProductClick = () => {
    navigation.navigate('Details', {productId: item.id, title: item.title});
  };
  const productImage = {uri: item.images[0]?.thumbnail};
  const hasDicount = item.discounted_price !== '0.0';
  const price = hasDicount ? item.discounted_price : item.price;
  const finalPrice = '$' + formatPrice(price);
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onProductClick}>
      <FavoriteButton
        isSelected={item.favorite}
        productId={item.id}
        containerStyle={styles.favoriteButton}
      />
      <Image
        defaultSource={ImagePlaceholder}
        source={productImage}
        style={styles.image}
      />
      <Text numberOfLines={1} style={styles.title}>
        {item.title}
      </Text>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>{finalPrice}</Text>
        {hasDicount && (
          <Text style={styles.originalPrice}>
            {'$' + formatPrice(item.price)}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    marginVertical: 8,
    marginHorizontal: 8,
    borderRadius: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  favoriteButton: {
    position: 'absolute',
    right: 8,
    top: 8,
    zIndex: 2,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  title: {
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 16,
    color: Colors.dark,
  },
  priceContainer: {
    marginTop: 16,
    flexDirection: 'row',
  },
  price: {
    color: Colors.dark,
    fontWeight: 'bold',
  },
  originalPrice: {
    marginLeft: 4,
    textDecorationLine: 'line-through',
    fontSize: 12,
    opacity: 0.6,
    color: Colors.dark,
  },
});

export default memo(ProductItem);
