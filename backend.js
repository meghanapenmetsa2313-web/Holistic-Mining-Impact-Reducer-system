// backend.js

// ---------------- USERS ----------------
const users = {
    admin: { password:"admin123", role:"Admin" },
    inspector: { password:"inspect123", role:"Inspector" }
};

// ---------------- MINING METHODS ----------------
const methods = [
    {name:"RDX Blasting", pollution:"High", cost:"Medium", efficiency:90, safety:"Low", vibration:9},
    {name:"Hydraulic Fragmentation", pollution:"Low", cost:"Low", efficiency:75, safety:"High", vibration:3},
    {name:"Chemical Rock Breaking", pollution:"Medium", cost:"Medium", efficiency:70, safety:"Medium", vibration:4},
    {name:"Plasma Rock Fragmentation", pollution:"Low", cost:"High", efficiency:85, safety:"High", vibration:5},
    {name:"Micro-Blast Technology", pollution:"Medium", cost:"Medium", efficiency:80, safety:"Medium", vibration:6},
    {name:"Controlled Smart Detonation", pollution:"Medium", cost:"Medium", efficiency:88, safety:"High", vibration:5}
];

// ---------------- LOGIN VALIDATION ----------------
function validateLogin(username, password){
    if(users[username] && users[username].password === password){
        return { success:true, role: users[username].role };
    }
    return { success:false, role:null };
}

// ---------------- GENERATE MOCK LOCATION ----------------
function getRandomLocation(){
    let lat = 20 + Math.random();
    let lng = 78 + Math.random();
    return { lat: parseFloat(lat.toFixed(4)), lng: parseFloat(lng.toFixed(4)) };
}

// ---------------- ANALYZE MINING SITE ----------------
function analyzeSite(lat, lng){
    let air = Math.floor(Math.random()*150);
    let water = (Math.random()*3+5).toFixed(2);
    let soil = Math.floor(Math.random()*10);
    let vibration = Math.floor(Math.random()*11);
    let legal = Math.random() > 0.5;

    let risk = 0;
    if(!legal) risk += 5;
    if(air > 50) risk += 2;
    if(water < 6 || water > 9) risk += 2;
    if(soil > 5) risk += 2;
    if(vibration > 7) risk += 1;

    let riskStatus = risk <= 3 ? "Low" : risk <= 7 ? "Medium" : "High";

    return {
        location: { lat, lng },
        air: air,
        water: water,
        soil: soil,
        vibration: vibration,
        legal: legal,
        riskScore: risk,
        riskStatus: riskStatus
    };
}

// ---------------- METHOD COMPARISON ----------------
function getMethodComparison(){
    return methods.map(m => ({
        name: m.name,
        pollution: m.pollution,
        cost: m.cost,
        efficiency: m.efficiency,
        safety: m.safety,
        vibration: m.vibration
    }));
}

// ---------------- RECOMMENDATIONS ----------------
function generateRecommendations(siteAnalysis){
    let recs = [];
    if(siteAnalysis.air > 50) recs.push("Activate dust suppression");
    if(siteAnalysis.water < 6) recs.push("Water neutralization required");
    if(siteAnalysis.soil > 5) recs.push("Soil stabilization treatment");
    if(siteAnalysis.vibration > 7) recs.push("Reduce vibration impact");
    if(!siteAnalysis.legal) recs.push("Investigate unauthorized mining");
    return recs;
}

// ---------------- EXPORT ----------------
export { validateLogin, getRandomLocation, analyzeSite, getMethodComparison, generateRecommendations };
