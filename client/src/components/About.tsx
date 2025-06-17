import { ArcImage } from './ArcImage'
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const About = () => {
    const baseImages = [
        "https://scontent.fcmb2-2.fna.fbcdn.net/v/t39.30808-6/490021428_1230412122420375_8551961061504999014_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGVk_QilJdPekIKga4FG5sENWhihi51jGs1aGKGLnWMa6IyqLUWALDpCiyFm9gOPJ2o2nhyqzjPfSXLbcB1N_ER&_nc_ohc=Ak9GtwYMWWAQ7kNvwHrahH3&_nc_oc=AdnlUcXKhNn5utAU9LuIYm_05wG2YrIFPF4dDkGbi2kZvbUkCVo9Y6PHgfRwQdbRnkM&_nc_zt=23&_nc_ht=scontent.fcmb2-2.fna&_nc_gid=mQmzVeURStEWnXukxo3BvQ&oh=00_AfMz9XHI8pb6eSOfilkffaSAtnBt4gqfChGyXgI1lmWhiQ&oe=6855BA51",
        "https://scontent.fcmb2-2.fna.fbcdn.net/v/t39.30808-6/490227109_1230412212420366_7046289626465994930_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEwt3PRLFfVyhBomMBcsNUjV8010rCC-mtXzTXSsIL6awrGKij9Q8C3udK4-Q8o5ofz8c5w6yQpaCuE1necFyGd&_nc_ohc=Lexk_ZHBw8AQ7kNvwFVN3Mw&_nc_oc=AdmWidmPurTnZubEdLsMAd7_YNin9XXp2Qpc2eiuTF8oiIlTJA0H6D2RIqY22ubCp-w&_nc_zt=23&_nc_ht=scontent.fcmb2-2.fna&_nc_gid=gwXtT6bp8u3iOBEIeGR5zg&oh=00_AfPwj0TIe3dPKuDXbOMX1CtfgS4Ta3ccGZjPTo_KB6kWiQ&oe=6855AF36",
        "https://scontent.fcmb2-2.fna.fbcdn.net/v/t39.30808-6/489920699_1230412125753708_6119735892557627854_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGl0TIibgdgd3dwHrCMxhJAEyzJFtfYFlATLMkW19gWUNAds1_Nv9FaXlfySc3TakzJJzQVb39Y8MEijY6l2eHc&_nc_ohc=TQHQtcWUqPMQ7kNvwE_QQJw&_nc_oc=AdmRONbASpvgGXskMMepf0n3Lja4hROWlhc3WOs_rM5rq7ientbT6LPAmMtY7wW_7X4&_nc_zt=23&_nc_ht=scontent.fcmb2-2.fna&_nc_gid=iCj9Oz0yE24SZ0j9CUjZiQ&oh=00_AfNXWxeAMqUlCwZryU8JyoWJ_b00dSK30EKXsqLpK4oBxg&oe=6855CF5C",
        "https://scontent.fcmb2-2.fna.fbcdn.net/v/t39.30808-6/489922734_1230412342420353_875587620881565574_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFRqNomC5CW6JjKhBRRO6YsSCS5KwKc-hZIJLkrApz6Fo3A0kooeRWQA2ltTZ5IxpBoAtw9ofb0N5ZFv-mEOpPU&_nc_ohc=XxOxGLaG65QQ7kNvwEZpwDr&_nc_oc=AdlUjV_uva3YKzbC5gRSydxhNhXOlNdOHe_bA6DyEXWYEvKsh31Gp9xT692-DRLvugA&_nc_zt=23&_nc_ht=scontent.fcmb2-2.fna&_nc_gid=6JIhYx2Njzga-DNhIWc2KQ&oh=00_AfOBTSlhNafIkHninIK5Gs843nVzt_xz7bojtrDABsJfWw&oe=6855B842",
        "https://scontent.fcmb2-2.fna.fbcdn.net/v/t39.30808-6/490344386_1228648259263428_8404366543603626413_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGmhBdX6Lyl3XB8os82KJcijBMiAdhBfbeMEyIB2EF9txfQUEOn2WmyGTdWVbG4llMkpq3GgQADe315DQJrCkFp&_nc_ohc=HkazBp7Xum4Q7kNvwF1hbar&_nc_oc=Admg9imEOlbp0bBPoqTBt-T1w1o6_oXuo0KCsn6ng5qykGUdKF_vQL3mF21a0JkkKE4&_nc_zt=23&_nc_ht=scontent.fcmb2-2.fna&_nc_gid=WvPuiwiIpKjul4ju9wZVXQ&oh=00_AfP5qdqm7uZhUcKqwRNA6YOFKFhsaA2D4foY_TM8JbJXxQ&oe=6855C03E",
        "https://scontent.fcmb2-2.fna.fbcdn.net/v/t39.30808-6/487441963_1217548210373433_5487171785453803037_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGtP9UWaJjRRwQUSab0mqpR20lNGrdsILXbSU0at2wgtcdo5YKyzMDGxpS-iMwi_GpdaQ-f2GkiOt34Z8fYO2Ef&_nc_ohc=kPmXdV9QFBoQ7kNvwHrQQq-&_nc_oc=AdlaMcP9GsKZIk7dZx-eaxt-2tgdOkJAoHI6_L1M16_I-xBHTmU5c0KjbdhiMcN7pqY&_nc_zt=23&_nc_ht=scontent.fcmb2-2.fna&_nc_gid=SUCue9ll1Tu2fRgTK2OQlQ&oh=00_AfNt1_3d9_30JfOR_2ArUYgwZHaGYi0UIxLttOoUL9tWHw&oe=6855B66C",
        "https://scontent.fcmb2-2.fna.fbcdn.net/v/t39.30808-6/487749514_1217548270373427_2441065573204157864_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEvcpEkptk_yW-igeuX7zNdAMRRv1BCAREAxFG_UEIBEdV-Hmcwu3W-Ir9HBc2ZF9GxqP4LoVAByP3mQNGkDwi8&_nc_ohc=vDBCiuOpnWwQ7kNvwGpUWiY&_nc_oc=Adlx6D05ph09BkVFCWhUSIdikeExIqPMhM3JVr1o2SKShKkISZv9P-lRjsdKvkixWT0&_nc_zt=23&_nc_ht=scontent.fcmb2-2.fna&_nc_gid=FN55QtTgLqsBEcQhxHjeRw&oh=00_AfMaj9s2xfhMMPP68PbrwQIYtzsk07X6cVMNRK2JCV3Hwg&oe=6855B5DD",
        "https://scontent.fcmb2-2.fna.fbcdn.net/v/t39.30808-6/483509433_1204376625023925_5112935918855044225_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEZkL3Jsg52hzyJ-ibn8dM_R_PKZatUmb1H88plq1SZvUU5O3AjHAeqU3nnF1W64S5sGpOm-VmXdKHjxlM3IXZH&_nc_ohc=kBY6lmULcOkQ7kNvwHOu6F4&_nc_oc=AdmnxL810TZz_ObvgfT1bVQjmi-rG5pSCQvCCmQuQ_z4desLhXQb3qKVJIXuOf0wubo&_nc_zt=23&_nc_ht=scontent.fcmb2-2.fna&_nc_gid=G-tvv_mt90fEKPbp8EvkzA&oh=00_AfMLcsHyMAit2CER8gKpdAMXtWfRp0cokfsoiPyn3Eaiyg&oe=6855C83A",
        "https://scontent.fcmb2-2.fna.fbcdn.net/v/t1.6435-9/80543976_1368379323324077_8635652444396716032_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeG0nioL3y2e9JzpbXW7uhAQmuFlLQ_BvJSa4WUtD8G8lEi8n0nAHfciVxqQCT0pyAaxBPls6-4PljLY07xqJQpF&_nc_ohc=GjRsQlDzsUwQ7kNvwHhRR-Q&_nc_oc=AdnDUzXGQZ7exnNd6foaR3Q9tQOsfEHL7B8dZxMonlnhxI8i0yAvvDz3x14n4OzVZ-I&_nc_zt=23&_nc_ht=scontent.fcmb2-2.fna&_nc_gid=_qcJXePT31jmirlAEhIsAQ&oh=00_AfOplas_2iPGMrcbEy7Z_-z2Z4DIC80DlmveOVJQKuqwwQ&oe=68774AB7",
        "https://scontent.fcmb2-2.fna.fbcdn.net/v/t39.30808-6/337497411_190968353668889_7374672168131988230_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGQyLAFSmAnWvq5JGKQ3DES-I-dZIEjAdT4j51kgSMB1PH3BBj-oB3z8vGQwaxeLiE-jS3lyg6lqzQJf08t0ewO&_nc_ohc=ZoQLAJdg_6IQ7kNvwG_cF8V&_nc_oc=AdnMlYmYBFFl3jziMXbyUm1oR0nBDc1kgkbXy3JQFh1F8zdLfKKQ0eCFtpwT3dNCdJU&_nc_zt=23&_nc_ht=scontent.fcmb2-2.fna&_nc_gid=wh74Z1SGYQFdot011qStVA&oh=00_AfPR-Nszpr5928-wxWVfPG4EDhYj2airR31wEKFC_mhG6Q&oe=6855C420",
    ]

    const images = [...baseImages, ...baseImages];

    return (
        <div id='about' className="sm:h-[70vh] h-[50vh] overflow-hidden">
            <section className="relative min-h-screen bg-white text-black flex flex-col items-center justify-start pt-24 md:pt-36 lg:pt-48 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center sm:mt-[500px] mt-[-50px]">
                    <div className="sm:w-[1080px] sm:h-[1080px] w-[700px] h-[700px] aspect-square relative">
                        <div className="absolute inset-0 [animation:spin_50s_linear_infinite]">
                            {images.map((src, index) => {
                                const angle = (2 * Math.PI * index) / images.length;
                                const radius = 50;
                                const xPercent = 50 + radius * Math.cos(angle)
                                const yPercent = 50 + radius * Math.sin(angle)

                                // const scale = 0.8 + 0.2 * Math.sin(angle)
                                return (
                                    <ArcImage
                                        key={index}
                                        src={src}
                                        style={{
                                            left: `${xPercent}%`,
                                            top: `${yPercent}%`,
                                            transform: `translate(-50%, -50%) rotate(${angle * (180 / Math.PI)}deg)`,
                                        }}
                                    />
                                )
                            })}
                        </div>
                    </div>
                </div>
                <motion.div
                    className='relative z-10 text-center max-w-2xl mx-auto px-4 my-5'
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: false, amount: 0.5 }}
                >
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">About Lando Travels</h1>
                    <p className="text-gray-500 text-sm sm:text-base mb-8 px-2 max-w-lg mx-auto">
                        At Lando Travels, we take pride in being one of Sri Lanka's premier travel agencies, specializing in corporate travel services.
                        With over two decades of industry experience, our dedicated and highly trained team is committed to providing top-tier service,
                        handling all your travel needs with efficiency and care.
                    </p>
                    <Link to={'/about'} className="bg-blue-500 text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-blue-600 transition">
                        Learn More
                    </Link>
                </motion.div>
                <div className="absolute top-[410px] left-0 w-full h-[50px] z-20 pointer-events-none">
                    <div className="w-full h-full bg-gray-300 blur-3xl rounded-full opacity-50" />
                </div>
            </section>
        </div>
    )
}

export default About
