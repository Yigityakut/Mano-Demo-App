import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import Colors from '../assets/Colors';
import MinusIcon from '../assets/icons/minus.png';
import PlusIcon from '../assets/icons/plus.png';

interface QuantityControllerProps {
  quantity: number;
  onMinusClick: () => void;
  onPlusClick: () => void;
}
const QuantityController: FC<QuantityControllerProps> = ({
  quantity,
  onMinusClick,
  onPlusClick,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={quantity === 1}
        onPress={onMinusClick}
        style={[styles.buttonContainer, quantity === 1 && {opacity: 0.4}]}>
        <Image source={MinusIcon} style={styles.controllerIcon} />
      </TouchableOpacity>
      <Text style={styles.quantity}>{quantity}</Text>
      <TouchableOpacity onPress={onPlusClick} style={styles.buttonContainer}>
        <Image source={PlusIcon} style={styles.controllerIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default QuantityController;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.green,
    marginHorizontal: 16,
    justifyContent: 'center',
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  buttonContainer: {
    height: 24,
    width: 24,
    borderRadius: 6,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controllerIcon: {
    height: 16,
    width: 16,
    resizeMode: 'contain',
  },
  quantity: {
    fontSize: 18,
    marginHorizontal: 8,
    color: Colors.white,
  },
});
