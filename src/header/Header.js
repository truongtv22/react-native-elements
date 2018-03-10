import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import isEmpty from 'lodash.isempty';
import DummyNavButton from './DummyNavButton';
import NavButton from './NavButton';
import Title from './Title';

function generateChild(value, style, type) {
  if (React.isValidElement(value)) {
    return (
      <View key={type} style={style}>
        {value}
      </View>
    );
  } else if (typeof value === 'object' && !isEmpty(value)) {
    return type === 'center'
      ? <Title {...value} key={type} />
      : <NavButton {...value} key={type} />;
  }
  return type === 'center' ? null : <DummyNavButton key={type} />;
}

function populateChildren(propChildren, styleChildren) {
  const childrenArray = [];

  const leftComponent = generateChild(propChildren.leftComponent, styleChildren.leftComponentStyle, 'left');
  const centerComponent = generateChild(propChildren.centerComponent, styleChildren.centerComponentStyle, 'center');
  const rightComponent = generateChild(propChildren.rightComponent, styleChildren.rightComponentStyle, 'right');

  childrenArray.push(leftComponent, centerComponent, rightComponent);

  return childrenArray;
}

const Header = props => {
  const {
    children,
    statusBarProps,
    leftComponent,
    centerComponent,
    rightComponent,
    leftComponentStyle,
    centerComponentStyle,
    rightComponentStyle,
    backgroundColor,
    outerContainerStyles,
    innerContainerStyles,
    ...attributes
  } = props;

  let propChildren = [];

  if (leftComponent || centerComponent || rightComponent) {
    propChildren = populateChildren({
      leftComponent,
      centerComponent,
      rightComponent,
    }, {
      leftComponentStyle,
      centerComponentStyle,
      rightComponentStyle,
    });
  }

  return (
    <View
      style={[styles.outerContainer, { backgroundColor }, outerContainerStyles]}
      {...attributes}
    >
      <StatusBar {...statusBarProps} />
      <View style={[styles.innerContainer, innerContainerStyles]}>
        {propChildren.length > 0 ? propChildren : children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  outerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderBottomColor: '#f2f2f2',
    borderBottomWidth: 1,
    padding: 15,
    height: 70,
  },
});

export default Header;
