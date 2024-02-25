import {FC, memo} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Category} from '../types';
import Colors from '../assets/Colors';

type CategoryItemProps = {
  onCategoryClick: () => void;
  item: Category;
  isSelected: boolean;
};

const CategoryItem: FC<CategoryItemProps> = ({
  onCategoryClick,
  item,
  isSelected,
}) => {
  return (
    <TouchableOpacity
      onPress={onCategoryClick}
      style={[
        styles.container,
        isSelected && {
          backgroundColor: Colors.white,
        },
      ]}>
      <Text style={[styles.title, isSelected && {color: Colors.dark}]}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 99,
    backgroundColor: Colors.softBlue,
    marginRight: 8,
  },
  title: {
    color: Colors.white,
    fontSize: 12,
  },
});

export default memo(CategoryItem);
