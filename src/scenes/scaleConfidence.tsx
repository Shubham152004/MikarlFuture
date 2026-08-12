import React from "react";
import {AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig} from "remotion";
import {GradientBackground} from "../components/GradientBackground";
import {AnimatedText} from "../components/AnimatedText";

const products = [ {name: "Aviator", price: "$129"}, {name: "Classic Black", price: "$149"}, {name: "Sunset", price: "$119"}, ];

export const ScaleConfidence: React.FC = () => {
    const frame = useCurrentFrame();
    const {fps} = useVideoConfig();

    const chartProgress = spring({
        frame: frame - 45,
        fps,
        config: {damping: 200, stiffness: 160},
    });

    return (
        <AbsoluteFill>
            <GradientBackground variant="violet" />

            <AbsoluteFill style={{alignItems: "center", justifyContent: "flex-start", paddingTop: 100}}>
                <AnimatedText segments={[{text: "Scale with "}, {text: "confidence", color: "#7C5CFC"},]}
                                fontSize={52}/>
            </AbsoluteFill>

            <AbsoluteFill style={{alignItems: "center", justifyContent: "center", paddingTop: 130,}}>
                <div style={{width: 1050, display: "flex", gap: 28, alignItems: "stretch",}}>
                    {/* Product cards */}
                    <div style={{flex: 1.5, background: "rgba(255,255,255,0.88)", borderRadius: 24, padding: 24, boxShadow: "0 30px 80px rgba(80,50,120,0.18)",}}>
                        <div style={{fontFamily: "'Inter', sans-serif", fontSize: 15,fontWeight: 600, color: "#777", marginBottom: 18,}}>
                            Product catalog
                        </div>
                        <div style={{display: "flex", gap: 16,}}>
                            {products.map((product,i) => {
                                const progress  = spring({
                                    frame: frame - (10 + i* 8),
                                    fps,
                                    config: { damping: 180, stiffness: 200},});

                                    return (
                                        <div key={product.name} style={{flex: 1, opacity: progress, transform: `translateY(${(1-progress)*30}px)`,}}>
                                            <div style={{height: 150,borderRadius: 16,
                                             background: [
                                                "linear-gradient(145deg, #171722, #777)",
                                                "linear-gradient(145deg, #222, #aaa)",
                                                "linear-gradient(145deg, #7c5cfc, #d5b7ed)",
                                                ][i],
                                                marginBottom: 12,
                                             }}/>
                                             <div style={{fontFamily: "Inter,sant-serif", fontSize:15,fontWeight:600,color:"#252430",}}>
                                                {product.name}
                                             </div>
                                             <div style={{fontFamily: "Inter,sant-serif", fontSize:13,color:"#555",marginTop:4,}}>
                                                {product.price}
                                             </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    {/* Growth Chart */}
                    <div style={{flex: 1, background: " rgba(255,255,255,0.88)",borderRadius: 24,padding:24,boxShadow: "0 30px 80px rgba(80,50,120,0.18)",}}>
                        <div style={{fontFamily:"Inter, sans-serif",fontSize:15,fontWeight:600,color:"#777",marginBottom:12,}}>
                            Marketplace growth
                        </div>
                        <div style={{fontFamily:"Inter,sans-serif",fontSize:34,fontWeight:700,color:"#252430",}}>
                            +42%
                        </div>
                        {/*Simple chart */}
                        <div style={{height: 180,marginTop: 20,position: "relative",}}>
                            <svg width="100%" height="100%" viewBox="0 0 400 180" preserveAspectRatio="none" >
                                <polyline
                                points="0,150 70,135 130,145 190,105 250,110 310,55 400,25"
                                fill="none"
                                stroke="#7C5CFC"
                                strokeWidth="6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                pathLength="1"
                                strokeDasharray="1"
                                strokeDashoffset={1 - chartProgress}
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </AbsoluteFill>
        </AbsoluteFill>
    )

}