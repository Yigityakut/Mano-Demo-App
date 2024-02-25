import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/types';
import BackIcon from '../assets/icons/back.png';
import ShopIcon from '../assets/icons/bag.png';
import ImagePlaceholder from '../assets/icons/image-placeholder.png';
import productStore from '../store/ProductStore';
import Loader from '../components/Loader';
import {StackNavigationProp} from '@react-navigation/stack';
import Colors from '../assets/Colors';
import FavoriteButton from '../components/FavoriteButton';
import {formatPrice} from '../utils/PriceHelper';
import {screenHeight, screenWidth} from '../utils/UIHelper';
import QuantityController from '../components/QuantityController';
import {ImageZoom} from '@likashefqet/react-native-image-zoom';
import Modal from '../components/Modal';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

type ItemDetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

const ItemDetailsScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'Details'>>();
  const route = useRoute<ItemDetailsScreenRouteProp>();

  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const {productId, title} = route.params;
  const product = productStore.selectedProduct;
  const image = {uri: product?.images[0]?.large};

  useEffect(() => {
    navigation.setOptions({title});
    const fetchProductDetails = async () => {
      try {
        await productStore.fetchProductDetails(productId);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProductDetails();
  }, []);

  if (isLoading) return <Loader />;

  const onMinusClick = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  const onPlusClick = () => {
    setQuantity(prev => prev + 1);
  };

  const onReadMoreClick = () => {
    setIsExpanded(prev => !prev);
  };

  const hasDicount = product!.discounted_price !== '0.0';
  const price = hasDicount ? product!.discounted_price : product!.price;
  const formattedPrice = formatPrice(price);
  const finalPrice = '$' + Number(formattedPrice) * quantity;
  return (
    <View style={styles.wrapper}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={BackIcon} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Details</Text>
          <FavoriteButton
            isSelected={product?.favorite}
            iconStyle={styles.favoriteButton}
            productId={product!.id}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setModalVisible(true)}
          style={styles.imageContainer}>
          <Image
            source={image}
            defaultSource={ImagePlaceholder}
            style={styles.image}
          />
        </TouchableOpacity>
        <View style={styles.detailsComtainer}>
          <Text style={styles.productTitle}>{product?.title}</Text>
          <Text style={styles.productDetailsTitle}>Product Details</Text>
          <Text style={styles.description} numberOfLines={isExpanded ? 0 : 4}>
            {
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            }
          </Text>
          <TouchableOpacity
            onPress={onReadMoreClick}
            style={styles.readMoreContainer}>
            <Text style={styles.readMoreText}>
              {isExpanded ? 'Less' : 'Read more'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <View>
          <Text style={styles.totalPriceText}>Total Price</Text>
          <Text style={styles.price}>{finalPrice}</Text>
        </View>
        <QuantityController
          onMinusClick={onMinusClick}
          onPlusClick={onPlusClick}
          quantity={quantity}
        />
        <TouchableOpacity style={styles.addToCartButtonContainer}>
          <Image source={ShopIcon} style={styles.bagIcon} />
          <Text style={styles.addToCartTitle}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
      <Modal
        isVisible={modalVisible}
        isCloseButtonVisible
        onClose={() => setModalVisible(!modalVisible)}>
        <GestureHandlerRootView style={styles.largeImageWrapper}>
          <ImageZoom
            uri={image.uri}
            minScale={0.5}
            maxScale={8}
            style={styles.largeImage}
            resizeMode="contain"
          />
        </GestureHandlerRootView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    paddingBottom: screenHeight / 4,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.white,
  },
  backIcon: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
  },
  headerTitle: {
    color: Colors.dark,
    fontSize: 16,
  },
  favoriteButton: {
    height: 40,
    width: 40,
  },
  detailsComtainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  productTitle: {
    fontSize: 16,
  },
  productDetailsTitle: {
    marginTop: 24,
  },
  imageContainer: {
    width: screenWidth,
    backgroundColor: Colors.white,
  },
  image: {
    width: screenWidth,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: Colors.gray,
    marginTop: 8,
  },
  readMoreContainer: {
    alignItems: 'center',
  },
  readMoreText: {
    textDecorationLine: 'underline',
  },
  bottomContainer: {
    padding: 16,
    backgroundColor: Colors.white,
    position: 'absolute',
    bottom: 0,
    width: screenWidth,
    flexDirection: 'row',
  },
  totalPriceText: {
    fontSize: 16,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
  },
  addToCartButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.green,
    borderRadius: 8,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  bagIcon: {
    height: 24,
    width: 24,
  },
  addToCartTitle: {
    fontSize: 14,
    marginLeft: 12,
    color: Colors.white,
  },
  largeImageWrapper: {
    height: screenHeight / 1.8,
    alignItems: 'center',
  },
  largeImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
});

export default ItemDetailsScreen;
