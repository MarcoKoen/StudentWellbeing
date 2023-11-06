import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Linking, StyleSheet } from 'react-native';

const ResourcesScreen = () => {
  const [sections, setSections] = useState([
    {
      title: 'Breathing and Meditation',
      links: [{
        title: '10 Breathing Exercises to Try: For Stress, Training, and Lung Capacity (healthline.com)',
        link: 'https://www.healthline.com/health/breathing-exercise#types',
      },
      {
        title: 'One-Moment Meditation: "How to Meditate in a Moment" - YouTube',
        link: 'https://www.youtube.com/watch?v=F6eFFCi12v8',
      },
      {
        title:'9 Breathing Exercises to Relieve Anxiety (verywellmind.com)',
        link: 'https://www.verywellmind.com/breathing-exercises-for-anxiety-2584118',
      },
      {
        title: 'Breathing Exercises To Reduce Stress - Headspace',
        link: 'https://www.headspace.com/meditation/relieve-stress',
      },
      {
        title: 'Breathing Timer GIFS (mindfuldevmag.com)',
        link: 'https://mindfuldevmag.com/breathing-timer-gifs/',
      } ],

      isOpen: false,
    },
    {
      title: 'Healthy Eating',
      links: [
        {
          title: 'Easy student recipes | Student food guides | Jamie Oliver',
          link: 'https://www.jamieoliver.com/recipes/category/student-food/',
        },
        {
          title: 'Healthy Food Guide - Delicious recipes and expert diet advice',
          link: 'https://www.healthyfood.com/',
        },
        {
          title: '10 healthy eating habits to get into • Heart Research Institute NZ (hri.org.nz)',
          link: 'https://www.hri.org.nz/healthy-living/10-healthy-eating-habits-to-get-into/',
        },
        {
          title: 'Healthy Eating by Lifestages - NZ Nutrition Foundation',
          link: 'https://nutritionfoundation.org.nz/nutrition-facts/nutrition-a-z/Healthy-Eating-by-Lifestages',
        }
      ],
      isOpen: false,
    },
    {
      title: 'Mental Health links',
      links: [
        {
          title: 'Welcome to Your Lowdown (thelowdown.co.nz) - by rangatahi for rangatahi',
          link: 'https://thelowdown.co.nz/',

        },
        {
          title: 'Home | All Right? - Mental Health Foundation of New Zealand',
          link: 'https://www.allright.org.nz/',
        },
        {
          title: 'Youthline - Youth Health Services, Youth helpline Program Centre NZ - Youthline NZ',
          link: 'https://www.youthline.co.nz/',
        },
      ],
      isOpen: false,
    },
    {
      title: 'Drug and Alcohol',
      links: [
        {
          title: "Home | NZ Drug Foundation - At the heart of the matter - if you're worried about yours, or someone else's use of drugs, or are just looking for information.",
          link: 'https://www.drugfoundation.org.nz/',
        },
        {
          title: 'Welcome - Know Your Stuff NZ - a free service that provide factual, proven information to drug users about the substances they intend to take by providing drug checking and drug related information at festivals and events.',
          link: 'https://knowyourstuff.nz/',
        },
        {
          title: 'Odyssey drug and alcohol support and information',
          link: 'https://www.odyssey.org.nz/',
        }
      ],
      isOpen: false,
    },
    {
      title: 'Other Health links',
      links: [
        {
          title:'Home | Healthify - general NZ health information.',
          link: 'https://www.healthifyme.com/blog/healthify-home/',
        },
        {
          title: 'Cancer Society NZ — Home - NZ Cancer Society',
          link: 'https://www.cancer.org.nz/',
        }
      
        ],
      isOpen: false,
    },
  ]);


  const toggleSection = (index) => {
    const updatedSections = [...sections];
    updatedSections[index].isOpen = !updatedSections[index].isOpen;
    setSections(updatedSections);
  };

  const handleLinkPress = (link) => {
    Linking.openURL(link);
  };

  return (
    <ScrollView style={styles.container}>
      {sections.map((section, index) => (
        <View key={index} style={styles.section}>
          <TouchableOpacity onPress={() => toggleSection(index)}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
          </TouchableOpacity>
          {section.isOpen && (
            <View style={styles.linkContainer}>
              {section.links.map((link, linkIndex) => (
                <TouchableOpacity
                  key={linkIndex}
                  style={styles.link}
                  onPress={() => handleLinkPress(link.link)}
                >
                  <Text style={styles.linkText}>{link.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F7F7F7', // Background color
  },
  section: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#FFF', // Section background color
    borderRadius: 8,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginBottom: 8,
    color: '#333', // Text color
  },
  linkContainer: {
    marginTop: 8,
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  link: {
    marginBottom: 8,
  }
});

export default ResourcesScreen;