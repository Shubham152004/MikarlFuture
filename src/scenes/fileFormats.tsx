import React from "react";
import { AbsoluteFill,useCurrentFrame,useVideoConfig,interpolate,spring,random, } from "remotion";
import { GradientBackground } from "../components/GradientBackground";

export const FileFormats:React.FC = () => {
    const frame = useCurrentFrame();
    const {fps} = useVideoConfig();

    const titleProgress = spring({frame,fps,config:{damping:180,stiffness:200},});
    
    const formats =[{name:"CSV",delay:10},{name:"XML",delay:16},{name:"JSON",delay:22},{name:"XLSX",delay:28},];

    return (
        <AbsoluteFill>
            <GradientBackground variant="neutral" />

            {/*Title*/}
            <AbsoluteFill style={{alignItems:"center",
            justifyContent:"flex-start",
            paddingTop:150,
            opacity:titleProgress,
            transform:`translateY(${(1-titleProgress)*25}px)`,
            }}>
                <div style={{fontFamily:"Georgia,Times New Roman,serif",
                    fontSize:42,
                    color:"#232230",
                }}>
                    Supports the file formats your suppliers already use
                </div>
            </AbsoluteFill>

            {/*File format cards */}
            <AbsoluteFill style={{alignItems:"center",
                justifyContent:"center",
                paddingTop:120,
            }}>
                <div style={{display:"flex",
                    gap:28,alignItems:"center",
                }}>
                    {formats.map((format)=>{
                        const progress = spring({
                            frame:frame - format.delay,
                            fps,config:{damping:180,stiffness:200}});
                        return (<div key={format.name}
                            style={{width:150,
                                height:180,
                                background:"#ffffff",
                                borderRadius:20,
                                boxShadow: "0 20px 55px rgba(80,50,130,0.15)",display:"flex",
                                flexDirection:"column",alignItems:"center",justifyContent:"center",
                                opacity:progress,
                                transform:`translateY(${(1-progress)*35}px) scale(${0.85 + progress * 0.15})`,
                            }
                        }>
                            {/*File icon */}
                            <div style={{width: 64,height:78,borderRadius: 8,background:"#f0edf8",
                                border: "2px solid #7c5cfc",display: "flex",
                                alignItems:"center",justifyContent:"center",
                                marginBottom:16,color:"#5a3ce0",
                                fontFamily:"Inter, sans-serif",
                                fontSize:14,fontWeight:700,
                            }}>
                                {format.name}
                            </div>
                            <div style={{fontFamily:"Inter,sans-serif",
                                fontSize:16,
                                fontWeight: 600,
                                color:"#292735",
                            }}>
                                {format.name} file
                            </div>
                        </div>
                        );
                    })}
                </div>
            </AbsoluteFill>
        </AbsoluteFill>
    )
}