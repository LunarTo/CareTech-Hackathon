// ─── CBC Descriptions by marker and level ─────────────────────────────────────
// Use these in your dashboard to show context-aware descriptions per result level.
// Levels: very_low | low | normal | high | very_high

export const CBC_DESCRIPTIONS = {

    WBC: {
      label: "White Blood Cells",
      what_it_is: "White blood cells are your immune system's army — they fight infections, viruses, and foreign substances in your body.",
      very_low: "Your white blood cell count is critically low. This is called severe leukopenia and means your immune system is significantly weakened. You may be highly vulnerable to infections. This needs immediate medical attention.",
      low: "Your white blood cell count is lower than normal (leukopenia). Your immune system may be less able to fight off infections. This can be caused by certain medications, viral infections, or bone marrow issues. Your doctor should evaluate this.",
      normal: "Your white blood cell count is in the healthy range. Your immune system appears to be functioning normally and is ready to fight infections.",
      high: "Your white blood cell count is higher than normal (leukocytosis). This often means your body is currently fighting an infection or inflammation. It can also be caused by stress, certain medications, or strenuous exercise.",
      very_high: "Your white blood cell count is significantly elevated. This may indicate a serious infection, severe inflammation, or in rare cases, a blood disorder. You should follow up with your doctor promptly.",
    },
  
    RBC: {
      label: "Red Blood Cells",
      what_it_is: "Red blood cells carry oxygen from your lungs to every organ and tissue in your body, and bring carbon dioxide back to the lungs.",
      very_low: "Your red blood cell count is critically low. This is severe anemia and means your body is struggling to deliver enough oxygen to your organs. You may feel very fatigued, short of breath, or dizzy. This requires prompt medical attention.",
      low: "Your red blood cell count is below normal, indicating anemia. Your body may not be getting enough oxygen, which can cause tiredness, weakness, and shortness of breath. Common causes include iron deficiency, vitamin deficiency, or blood loss.",
      normal: "Your red blood cell count is in the healthy range. Your blood is effectively transporting oxygen throughout your body.",
      high: "Your red blood cell count is above normal (polycythemia). This can occur with dehydration, smoking, or living at high altitude. In some cases it may indicate a bone marrow condition. Your doctor should review this.",
      very_high: "Your red blood cell count is significantly elevated. This could indicate a condition called polycythemia vera or severe dehydration. It thickens the blood and can increase clotting risk. Please consult your doctor.",
    },
  
    Hgb: {
      label: "Hemoglobin",
      what_it_is: "Hemoglobin is the protein inside red blood cells that actually carries oxygen. It gives blood its red color and is one of the most important markers of anemia.",
      very_low: "Your hemoglobin is critically low. Your blood can barely carry enough oxygen for your body's needs. Severe symptoms like extreme fatigue, chest pain, or difficulty breathing may occur. This is a medical emergency — please seek care.",
      low: "Your hemoglobin is below normal, which means you have anemia. Your body isn't getting as much oxygen as it should. You may feel tired, pale, or short of breath. Common causes are low iron, low B12, or blood loss.",
      normal: "Your hemoglobin level is healthy. Your red blood cells are effectively carrying oxygen to your tissues and organs.",
      high: "Your hemoglobin is above the normal range. This can occur with dehydration, smoking, or conditions where the body makes too many red blood cells. Your doctor should assess the cause.",
      very_high: "Your hemoglobin is significantly elevated. This can thicken your blood and increase the risk of clots. It may be linked to a bone marrow condition or chronic low oxygen levels. Follow up with your doctor.",
    },
  
    Hct: {
      label: "Hematocrit",
      what_it_is: "Hematocrit measures what percentage of your blood is made up of red blood cells. It's a key indicator of whether you have anemia or too many red blood cells.",
      very_low: "Your hematocrit is critically low. Less than a quarter of your blood is red blood cells, meaning oxygen delivery to your body is severely compromised. This requires urgent medical evaluation.",
      low: "Your hematocrit is below normal. This is consistent with anemia and means red blood cells make up a smaller portion of your blood than they should. You may feel fatigued or short of breath.",
      normal: "Your hematocrit is in the healthy range. The proportion of red blood cells in your blood is just right for efficient oxygen transport.",
      high: "Your hematocrit is above the normal range. Your blood may be thicker than usual, which can happen with dehydration or conditions that overproduce red blood cells.",
      very_high: "Your hematocrit is significantly elevated. Overly thick blood can increase the risk of clots and stroke. Please speak with your doctor about the underlying cause.",
    },
  
    MCV: {
      label: "Mean Corpuscular Volume (MCV)",
      what_it_is: "MCV measures the average size of your red blood cells. It helps doctors understand what type of anemia you may have — small cells often point to iron deficiency, large cells to B12 or folate deficiency.",
      very_low: "Your red blood cells are much smaller than normal (microcytic). This is a strong indicator of severe iron deficiency or thalassemia. Small cells carry less oxygen. This should be investigated by your doctor.",
      low: "Your red blood cells are slightly smaller than normal. This is commonly caused by iron deficiency or thalassemia trait. Combined with low hemoglobin, it points toward iron deficiency anemia.",
      normal: "Your red blood cell size is normal (normocytic). This is a good sign that your cells are healthy in terms of size.",
      high: "Your red blood cells are larger than normal (macrocytic). This is often caused by low vitamin B12 or folate levels. It can also result from liver disease, thyroid issues, or certain medications.",
      very_high: "Your red blood cells are significantly enlarged. This level of macrocytosis is usually caused by a serious B12 or folate deficiency, or a bone marrow problem. Your doctor should investigate promptly.",
    },
  
    MCH: {
      label: "Mean Corpuscular Hemoglobin (MCH)",
      what_it_is: "MCH tells us the average amount of hemoglobin inside each red blood cell. It reflects how much oxygen-carrying capacity each individual cell has.",
      very_low: "Each of your red blood cells contains much less hemoglobin than it should (hypochromia). This is a classic sign of severe iron deficiency. Your cells are pale and carry very little oxygen.",
      low: "Your red blood cells contain less hemoglobin than normal. This usually accompanies iron deficiency anemia and means each cell is carrying less oxygen than ideal.",
      normal: "The amount of hemoglobin in each of your red blood cells is normal. Each cell is well-equipped to carry oxygen.",
      high: "Each of your red blood cells contains more hemoglobin than average. This is typically associated with macrocytic anemia from B12 or folate deficiency.",
      very_high: "Your red blood cells are significantly overloaded with hemoglobin, which is usually linked to severe B12 or folate deficiency. Your doctor should evaluate the cause.",
    },
  
    MCHC: {
      label: "Mean Corpuscular Hemoglobin Concentration (MCHC)",
      what_it_is: "MCHC measures the concentration — or density — of hemoglobin in your red blood cells. It helps distinguish between different types of anemia.",
      very_low: "The hemoglobin concentration in your red blood cells is critically low. This means your cells are very pale and dilute. It's strongly associated with severe iron deficiency anemia.",
      low: "Your red blood cells have a lower than normal concentration of hemoglobin. This is called hypochromic anemia and is most commonly caused by iron deficiency.",
      normal: "The concentration of hemoglobin in your red blood cells is normal. Your cells are well-filled and functioning as they should.",
      high: "Your red blood cell hemoglobin concentration is above normal. This can occur in hereditary spherocytosis, a condition where red blood cells are abnormally shaped.",
      very_high: "Your MCHC is significantly elevated, which is rare and may indicate a red blood cell disorder such as hereditary spherocytosis. This should be evaluated by your doctor.",
    },
  
    RDW: {
      label: "Red Cell Distribution Width (RDW)",
      what_it_is: "RDW measures how much variation there is in the size of your red blood cells. A high RDW means your cells vary a lot in size, which can be an early sign of nutritional deficiencies.",
      very_low: "Your RDW is unusually low, meaning your red blood cells are all very similar in size. This is rarely a clinical concern on its own.",
      low: "Your RDW is at the low end of normal. Your red blood cells are quite uniform in size, which is generally not a concern.",
      normal: "Your RDW is normal, meaning your red blood cells are consistent in size. This is a healthy finding.",
      high: "Your RDW is above normal, meaning your red blood cells vary noticeably in size (anisocytosis). This is often an early sign of iron, B12, or folate deficiency — sometimes before anemia fully develops.",
      very_high: "Your RDW is significantly elevated, indicating a wide mix of red blood cell sizes. This can point to mixed nutritional deficiencies, hemolysis, or a bone marrow condition. Your doctor should investigate.",
    },
  
    Platelets: {
      label: "Platelets",
      what_it_is: "Platelets are tiny cell fragments that clump together to stop bleeding when you're injured. They're essential for blood clotting.",
      very_low: "Your platelet count is critically low (severe thrombocytopenia). You are at serious risk of spontaneous bleeding, including internal bleeding. This is a medical emergency — seek care immediately.",
      low: "Your platelet count is below normal (thrombocytopenia). Your blood may take longer than usual to clot. You might bruise easily or notice bleeding gums or nosebleeds. Your doctor should look into the cause.",
      normal: "Your platelet count is in the healthy range. Your blood should clot normally when needed.",
      high: "Your platelet count is above normal (thrombocytosis). This can happen after surgery, infection, or with iron deficiency. In some cases it increases clotting risk. Your doctor should assess if treatment is needed.",
      very_high: "Your platelet count is significantly elevated. Very high platelets can increase the risk of blood clots. This may be a reaction to another condition or could indicate a bone marrow disorder. Please follow up with your doctor.",
    },
  
    MPV: {
      label: "Mean Platelet Volume (MPV)",
      what_it_is: "MPV measures the average size of your platelets. Larger platelets tend to be younger and more active. MPV helps doctors understand platelet production and turnover.",
      very_low: "Your platelets are unusually small. This may indicate that your bone marrow is not producing platelets efficiently, sometimes seen in aplastic anemia or chemotherapy effects.",
      low: "Your platelets are slightly smaller than normal. This can be associated with certain inflammatory conditions or bone marrow suppression.",
      normal: "Your platelet size is in the normal range. This suggests healthy platelet production and turnover.",
      high: "Your platelets are larger than normal. Bigger platelets are often younger and more active, and can be a sign your body is compensating for platelet destruction or loss, as seen in immune thrombocytopenia.",
      very_high: "Your platelets are significantly enlarged. This can be associated with myeloproliferative disorders or conditions where platelets are being rapidly destroyed and replaced.",
    },
  
    "Neutrophils %": {
      label: "Neutrophils",
      what_it_is: "Neutrophils are the most common white blood cells and are your body's first responders to bacterial infections and acute inflammation.",
      very_low: "Your neutrophil percentage is critically low (severe neutropenia). This leaves you very vulnerable to bacterial infections, which can become life-threatening quickly. Seek medical care immediately.",
      low: "Your neutrophil percentage is below normal. This may reduce your ability to fight bacterial infections effectively. Your doctor should determine the cause.",
      normal: "Your neutrophil percentage is in the healthy range. Your body is well-equipped to respond to bacterial infections and inflammation.",
      high: "Your neutrophil percentage is elevated. This is a common response to bacterial infection, physical stress, or inflammation. It usually resolves once the underlying cause is treated.",
      very_high: "Your neutrophil percentage is significantly elevated. This suggests a serious bacterial infection, severe inflammation, or in rare cases, a blood disorder. Your doctor should evaluate this urgently.",
    },
  
    "Lymphocytes %": {
      label: "Lymphocytes",
      what_it_is: "Lymphocytes are white blood cells that coordinate your immune response, especially against viruses. They include T-cells and B-cells which create antibodies.",
      very_low: "Your lymphocyte percentage is critically low. This severely impairs your ability to fight viral infections and mount immune responses. This can be caused by HIV, certain cancers, or immunosuppressive treatments.",
      low: "Your lymphocyte percentage is below normal. This can be seen after steroid use, during severe bacterial infections, or with certain immune conditions. Your doctor should assess the cause.",
      normal: "Your lymphocyte percentage is in the healthy range. Your immune system's virus-fighting capacity appears to be functioning well.",
      high: "Your lymphocyte percentage is elevated (lymphocytosis). This is often a response to a viral infection such as the flu, mono, or COVID-19. It usually resolves on its own.",
      very_high: "Your lymphocyte percentage is significantly elevated. While viral infections can cause this, a very high count may also indicate a lymphocytic leukemia or lymphoma. Your doctor should evaluate this.",
    },
  
    "Monocytes %": {
      label: "Monocytes",
      what_it_is: "Monocytes are white blood cells that clean up dead cells and debris, and help regulate immune responses. They also fight certain chronic infections.",
      very_low: "Your monocyte percentage is very low. This is uncommon and may be seen with hairy cell leukemia or certain bone marrow conditions.",
      low: "Your monocyte percentage is slightly below normal. This is rarely a standalone concern but should be noted alongside your other CBC values.",
      normal: "Your monocyte percentage is normal. These cells are carrying out their cleanup and immune-regulation functions as expected.",
      high: "Your monocyte percentage is elevated (monocytosis). This can be a sign of chronic infection, autoimmune disease, or inflammatory conditions such as inflammatory bowel disease.",
      very_high: "Your monocyte percentage is significantly elevated. While chronic infections and inflammation are common causes, a very high count may also point to a blood disorder. Your doctor should evaluate.",
    },
  
    "Eosinophils %": {
      label: "Eosinophils",
      what_it_is: "Eosinophils are white blood cells that fight parasites and play a role in allergic reactions. They are typically low in healthy individuals.",
      very_low: "Your eosinophil percentage is very low or absent. This is generally not a clinical concern — eosinophils are normally present in very small amounts.",
      low: "Your eosinophil percentage is at the low end of normal. This is typically not concerning.",
      normal: "Your eosinophil percentage is normal. There are no signs of significant allergic activity or parasitic infection.",
      high: "Your eosinophil percentage is elevated (eosinophilia). This is commonly caused by allergies, asthma, eczema, or parasitic infections. Less commonly it can be related to autoimmune conditions.",
      very_high: "Your eosinophil percentage is significantly elevated (hypereosinophilia). At this level, it can potentially cause organ damage. Common causes include severe allergic disease, parasitic infection, or a rare condition called hypereosinophilic syndrome. Prompt evaluation is recommended.",
    },
  
    "Basophils %": {
      label: "Basophils",
      what_it_is: "Basophils are the rarest white blood cells and are involved in allergic reactions and inflammation. A small number is completely normal.",
      very_low: "Your basophil percentage is very low or zero. This is completely normal — basophils are naturally present in tiny amounts in healthy blood.",
      low: "Your basophil percentage is at or near zero. This is a normal finding.",
      normal: "Your basophil percentage is in the normal range. No concerns here.",
      high: "Your basophil percentage is slightly elevated (basophilia). This can occur with allergic reactions, inflammation, hypothyroidism, or certain infections.",
      very_high: "Your basophil percentage is significantly elevated. While rare, a very high basophil count can be associated with myeloproliferative disorders such as chronic myelogenous leukemia. Your doctor should evaluate this.",
    },
  
};

// Helper: get the right description for a test value
// Usage: getMarkerDescription("Hgb", 9.8, 12.0, 16.0)
export function getMarkerDescription(test, value, min, max) {
  const marker = CBC_DESCRIPTIONS[test];
  if (!marker) return "";

  const veryLowThreshold = min * 0.8;
  const veryHighThreshold = max * 1.2;

  if (value < veryLowThreshold) return marker.very_low;
  if (value < min) return marker.low;
  if (value > veryHighThreshold) return marker.very_high;
  if (value > max) return marker.high;
  return marker.normal;
}