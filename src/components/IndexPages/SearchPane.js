import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';

class SearchPane extends Component{
  render() {
    const {title} = this.props;
    return (
      <View style={styles.SearchPane}>
        <View>
          <Text>{title}</Text>
        </View>
      </View>
    )
  }
}

SearchPane.propTypes = {
  title: PropTypes.string
}

const styles = StyleSheet.create({
  SearchPane: {

  }
})

export default SearchPane;