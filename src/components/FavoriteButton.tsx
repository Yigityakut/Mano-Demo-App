import {
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React, {FC, useState} from 'react';
import FilledFavoriteIcon from '../assets/icons/favorite-filled.png';
import EmptyFavoriteIcon from '../assets/icons/favorite-empty.png';

interface FavoriteButtonProps {
  isSelected?: boolean;
  iconStyle?: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  productId: number;
}

const FavoriteButton: FC<FavoriteButtonProps> = ({
  isSelected = false,
  iconStyle,
  containerStyle,
  productId,
}: FavoriteButtonProps) => {
  const [isFavorite, setIsFavorite] = useState(isSelected);

  const onFavoriteClick = () => {
    setIsFavorite(prev => !prev);
    //TODO:ADD LOGIC TO MANAGE FAVORITE FUNCTIONALITY (productId)
  };
  const favoriteIcon = isFavorite ? FilledFavoriteIcon : EmptyFavoriteIcon;
  return (
    <TouchableOpacity style={containerStyle} onPress={onFavoriteClick}>
      <Image source={favoriteIcon} style={[styles.favoriteIcon, iconStyle]} />
    </TouchableOpacity>
  );
};

export default FavoriteButton;

const styles = StyleSheet.create({
  favoriteIcon: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
  },
});
