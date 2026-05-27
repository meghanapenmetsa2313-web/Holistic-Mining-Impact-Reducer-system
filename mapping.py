legal_zones = [
    {"name": "Zone A", "lat": 20.0, "lng": 78.0, "radius": 5},
    {"name": "Zone B", "lat": 20.5, "lng": 78.5, "radius": 4}
]

# -----------------------------
# Function to check legality
# -----------------------------
def check_legality(lat, lng):
    for zone in legal_zones:
        distance = ((lat - zone["lat"])**2 + (lng - zone["lng"])**2)**0.5
        if distance <= zone["radius"]/100:
            return True
    return False

# -----------------------------
# Function to calculate risk score and recommendations
# -----------------------------
def evaluate_mining(lat, lng, air_pm25, water_pH, soil_contamination, vibration, method):
    legal = check_legality(lat, lng)
    
    # Risk scoring
    risk_score = 0
    if not legal: risk_score += 5
    if air_pm25 > 50: risk_score += 2
    if water_pH < 6 or water_pH > 9: risk_score += 2
    if soil_contamination > 5: risk_score += 2
    if vibration > 7: risk_score += 1
    if method.lower() == "rdx": risk_score += 2
    
    # Recommendations
    recommendations = []
    if air_pm25 > 50: recommendations.append("Activate dust suppression")
    if water_pH < 6: recommendations.append("Activate water neutralization")
    if soil_contamination > 5: recommendations.append("Treat soil with eco-friendly stabilizers")
    if vibration > 7 or method.lower() == "rdx": recommendations.append("Switch to Hydraulic Rock Fragmentation")
    if not legal: recommendations.append("Investigate unauthorized mining")
    
    return legal, risk_score, recommendations

# -----------------------------
# Main program
# -----------------------------
def main():
    print("=== MineGuard – Mining Environmental Monitoring ===")
    num_sites = int(input("Enter number of mining sites to evaluate: "))
    mining_data = []

    for i in range(num_sites):
        print(f"\n--- Enter details for mining site {i+1} ---")
        lat = float(input("Latitude: "))
        lng = float(input("Longitude: "))
        air_pm25 = float(input("Air PM2.5 (µg/m³): "))
        water_pH = float(input("Water pH: "))
        soil_contamination = float(input("Soil contamination (0–10 scale): "))
        vibration = float(input("Vibration level (1–10 scale): "))
        method = input("Mining method (Hydraulic/RDX): ")

        legal, risk_score, recommendations = evaluate_mining(
            lat, lng, air_pm25, water_pH, soil_contamination, vibration, method
        )

        status = "Legal Mining" if legal else "Suspicious Mining"
        print(f"\nStatus: {status}")
        print(f"Risk Score: {risk_score}")
        print("Recommendations:", ", ".join(recommendations) if recommendations else "None")
        print("-"*50)

if __name__ == "__main__":
    main()