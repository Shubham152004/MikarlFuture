import React from "react";
import { AbsoluteFill,useCurrentFrame,spring,useVideoConfig } from "remotion";
import { GradientBackground } from "../components/GradientBackground";

export const ConnectIntro: React.FC =() => {
    const frame = useCurrentFrame();
    const {fps} =useVideoConfig();

    const titleProgress = spring( {
        frame,fps,config: {damping:180,stiffness:200},
    });

    const boltProgress = spring({
        frame,fps,config:{damping:180,stiffness:200},}
    );

    const nodeProgress  = (delay:number) => {
        return spring({
        frame:frame-delay,fps,config:{damping:180,stiffness:200},}
    );
    }

    const nodes = [
        {label: "Marketplace", x: -280,y: 80},
        {label:"Retailer", x: 280,y: 80},
        {label:"Brand",x: 0, y:280},
    ];

    return(
        <AbsoluteFill>
            <GradientBackground variant="violet" />
            
            {/*Title */}
            <AbsoluteFill style={{alignItems:"center",
            justifyContent:"flex-start",
            paddingTop: 110,
            opacity:titleProgress,
            transform:`translateY(${(1-titleProgress)*25}px)`,
            }}>
                <div style={{fontFamily: "Georgia,Times New Roman,serif",fontSize: 58,color:"#232230"}}>
                    Mirakl{" "}
                    <span style={{color:"#7C5CFC",fontStyle:"italic"}}>
                        Connect
                    </span>
                </div>
            </AbsoluteFill>
            
            {/*Connection area*/}
            <AbsoluteFill style={{alignItems: "center", justifyContent:"center",paddingTop:100,}}>
                {/*Lightning Bolt*/}
                <div style={{position:"absolute",
                    width:90,
                    height:120,
                    top: "50%",
                    left: "50%",
                    opacity:boltProgress,
                    transform: `translate(-50%, -50%) translateY(-40px) scale(${0.6 + boltProgress * 0.4}) rotate(${(1-boltProgress)* -15}deg)`,
                }}>
                    <div style={{width:0,height:0,borderLeft:"32px solid transparent",borderRight:"18px solid transparent",borderBottom:"60px solid #7C5CFC",transform: "skewX(-12deg)",
                    }}/>
                    <div
                    style={{
                    width: 0,
                    height: 0,
                    borderLeft: "18px solid transparent",
                    borderRight: "32px solid transparent",
                    borderTop: "60px solid #5a3ce0",
                    marginLeft: 24,
                    marginTop: -20,
                    transform: "skewX(-12deg)",
                    }}
                />
                </div>
                
                {/* Connection lines*/}
                {nodes.map((node,i) => {
                    const progress = nodeProgress(25+i*8);

                    // Math.hypot(x, y) = straight-line distance from (0,0) to (x,y) —
                    // the Pythagorean theorem (√(x²+y²)) built into JS.
                    // Math.atan2(y, x) = the angle (in radians) from (0,0) to (x,y).
                    // Together these convert a KNOWN point into "how far, which way" —
                    // the inverse of what AiAutomatesTasks.tsx did with cos/sin.
                    const lineLength = Math.hypot(node.x, node.y - 30);
                    const angleDeg = (Math.atan2(node.y - 30, node.x) * 180) / Math.PI;

                    return(
                        <React.Fragment key={node.label}>
                            <div style={{
                                position:"absolute",
                                width: lineLength,
                                height:3,
                                top: "50%",
                                left: "50%",
                                background:"linear-gradient(90deg, rgba(124,92,252,0), #7C5CFC)",
                                transformOrigin:"left center",
                                transform: `rotate(${angleDeg}deg) scaleX(${progress})`,
                                opacity: progress,
                            }}/>

                            {/*Node */}
                            <div style={{position:"absolute",
                                left: `calc(50% + ${node.x}px)`,
                                top: `calc(50% + ${node.y}px)`,
                                transform: `translate(-50%, -50%) 
                                scale(${0.7 + progress * 0.3})`,
                                opacity: progress,
                                background: "#ffffff",
                                borderRadius: 18,
                                padding: "16px 26px",
                                boxShadow: "0 18px 50px rgba(80,50,130,0.18)",
                                fontFamily: "Inter, sans-serif",
                                fontSize: 17,
                                fontWeight: 600,
                                color: "#292735",
                                whiteSpace: "nowrap",
                            }}>
                                {node.label}
                            </div>
                        </React.Fragment>
                    );
                })}
            </AbsoluteFill>
        </AbsoluteFill>
    )
}