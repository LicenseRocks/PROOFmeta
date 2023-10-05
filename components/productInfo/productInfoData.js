export const productInfoData = {
  environmentImpact: {
    title: "Environmental Impact",
    positions: {
      carbon:
        {
          title: "Carbon Emission",
          description: "Low emissions level.",
          emissions: "low"
        },
      water: {
        title: "Water Usage",
        description: "High amount of watrer saved in the production.",
        savedWaterFactor: "high"
      }
      ,
      material:
        {
          title: "Material",
          description: "Eco friendly material."
        },
      distance:
        {
          title: "Distance of prouduction",
          description: "Produced near to you"
        }
    },
    metricsToShow: ["120 grams of CO2 saved per product.", "Made with 98% recycled materials.", "Factory in Berlin"]
  },
  socialResponsibility:
    {
      title: "Social Responsibility",
      positions: {
        fairTrade: {
          title: "Fair Trade",
          description: "Adherence to ethical labor practices."
        },
        social: {
          description: "Social activity."
        },
        community: {
          title: "Community",
          description: "Community support and involvement."
        }

      },
      metricsToShow: ["Crafted by artisans paid a fair wage.", "20% of proceeds support local communities."]
    },
  governance: {
    title: "Governance",
    positions:
      {
        ethical: {
          title: "Ethical Practices",
          description: "High quality of ethical practices and moral decision-making.",
          practicesFactor: "high"
        },
        other: {
          description: "Nice Way of running the company."
        }
      },
    metricsToShow: ["Adheres to ethical sourcing practices.", "Governed by inclusive and equitable policies."]
  }
}