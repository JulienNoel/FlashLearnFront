import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Card, Icon } from "@rneui/themed";

export function GameScreen(props) {
  const [exerciceList, setExerciceList] = useState([]);

  useEffect(() => {
    setExerciceList(props.exo[0]);
    console.log(props.exo[0]);
  }, []);

  const displayExercice = exerciceList.map((el, i) => {
    return (
    <View>
      <Card containerStyle={{ marginTop: 15 }}>
        <Card.Title>{el.exerciceId}</Card.Title>
        <Card.Divider />
        <Icon
        raised
        name='lock'
        type='font-awesome'
        color='#f50'/>
      </Card>
      </View>
    );
  });

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", flexDirection: 'row' }}>
        <ScrollView showsVerticalScrollIndicator={false}>
            {displayExercice}
        </ScrollView>
    </View>
  );
}

function mapStateToProps(state) {
  return { langue: state.languageSelect, exo: state.exercice };
}

export default connect(mapStateToProps, null)(GameScreen);
