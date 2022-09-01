import React from "react";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

import useLanguage from "../hooks/useLanguage";

import { AntDesign } from "@expo/vector-icons";

export function HomeScreen(props) {
  const [count, setCount] = useState(0);
  const [hello, setHello] = useState("BONJOUR");
  const [langue, setLangue] = useState("Sélectionnez une langue");
  const [flag, setFlag] = useState(require("../assets/royaume-uni.png"));
  const [isSelected, setIsSelected] = useState("");

  var listLangues = [
    {
      language: "Anglais",
      langAbrev: "en",
      image: require("../assets/royaume-uni.png"),
      hello: "Welcome",
      select: "Select a language",
    },
    {
      language: "Italien",
      langAbrev: "it",
      image: require("../assets/italie.png"),
      hello: "Buongiorno",
      select: "Seleziona una lingua",
    },
    {
      language: "Espagnol",
      langAbrev: "es",
      image: require("../assets/espagne.png"),
      hello: "Hola",
      select: "Selecciona un idioma",
    },
    {
      language: "Thailandais",
      langAbrev: "th",
      image: require("../assets/thailande.png"),
      hello: "สวัสดี",
      select: "เลือกภาษา",
    },
    {
      language: "Portugais",
      langAbrev: "pt",
      image: require("../assets/le-portugal.png"),
      hello: "Olá",
      select: "Selecione um idioma",
    },
  ];

  count < 0 && setCount(listLangues.length - 1);
  count > listLangues.length - 1 && setCount(0);

  useEffect(() => {
    const settings = function (c) {
      setFlag(listLangues[c].image);
      setLangue(listLangues[c].select);
      setHello(listLangues[c].hello);
      props.selectLang(listLangues[c].langAbrev);
      setIsSelected(true);
    };
    settings(count);
  }, [count]);

  var changeLangue = (langue, i) => {
    const flagselection = useLanguage(langue);
    setLangue(flagselection[0].select);
    setHello(flagselection[0].hello);
    setFlag(flagselection[0].image);
    props.selectLang(langue);
    setIsSelected(true);
    setCount(i);
  };

  let displayMessage;
  if (isSelected === false) {
    displayMessage = (
      <Text style={{ fontSize: 15, color: "red" }}>
        Selectionner un language
      </Text>
    );
  }

  var handlePressExercice = () => {
    isSelected ? props.navigation.navigate("card") : setIsSelected(false);
  };

  var displayLang = listLangues.map((lang, i) => {
    return (
      <TouchableOpacity
        key={i}
        style={{ alignItems: "center", padding: 7 }}
        onPress={() => changeLangue(lang.langAbrev, i)}
      >
        <Text>{lang.language}</Text>
        <Image style={{ height: 70, width: 70 }} source={lang.image} />
      </TouchableOpacity>
    );
  });

  return (
    <View
      style={{ flex: 1, alignItems: "center", justifyContent: "flex-start" }}
    >
      <View
        style={{
          justifyContent: "space-evenly",
          alignItems: "center",
          width: "100%",
          height: "20%",
          paddingTop: 30,
          backgroundColor: "#9fa8da",
        }}
      >
        <Text style={{ fontSize: 35, color: "white", fontFamily: "Roboto" }}>
          {hello}
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          width: "90%",
        }}
      >
        <View>{displayMessage}</View>
        <ScrollView
          style={{ flex: 1, width: "85%" }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {displayLang}
          </View>
        </ScrollView>
      </View>

      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: "90%",
          height: "10%",
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontSize: 25,
            textAlign: "center",
            fontWeight: "500",
            color: "grey",
          }}
        >
          {langue}
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          width: "90%",
        }}
      >
        <TouchableOpacity onPress={() => setCount(count - 1)}>
          <AntDesign name="leftcircleo" size={80} color="#9fa8da" />
        </TouchableOpacity>
        <Image style={{ height: 70, width: 70 }} source={flag} />
        <TouchableOpacity onPress={() => setCount(count + 1)}>
          <AntDesign name="rightcircleo" size={80} color="#9fa8da" />
        </TouchableOpacity>
      </View>

      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: "90%",
          height: "15%",
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 50,
          }}
        >
          <TouchableOpacity
            onPress={() => handlePressExercice()}
            style={{
              width: 80,
              height: 80,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 100,
              backgroundColor: "#dad19f",
            }}
          >
            <Text style={{ fontSize: 15, color: "white" }}>GO</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    selectLang: function (lang) {
      dispatch({ type: "selectLang", language: lang });
    },
  };
}

export default connect(null, mapDispatchToProps)(HomeScreen);
