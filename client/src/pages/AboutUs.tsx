import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBullseye, FaEye } from "react-icons/fa";
import CompanyIntro from "../components/CompanyIntro ";

const AboutUs: React.FC = () => {

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

    const missionImages = ["/aboutCover.jpg", ...baseImages];
    const visionImages = [...missionImages.slice(1), missionImages[0]];

    const [missionIndex, setMissionIndex] = useState(0);
    const [visionIndex, setVisionIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setMissionIndex((prev) => (prev + 1) % missionImages.length);
            setVisionIndex((prev) => (prev + 1) % visionImages.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0 },
        show: { opacity: 1 },
    };


    return (
        <div className='justify-center items-center pb-20'>
            {/* Cover Section */}
            <section className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden">
                <img
                    src="/aboutCover.jpg"
                    alt="About Lando Travels"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                />
                <div className="absolute inset-0 bg-black/40 z-0" />
                <motion.div
                    className="relative z-10 flex flex-col items-center text-center md:text-left md:items-end md:flex-row justify-between max-w-7xl mx-auto px-6 md:px-12 h-full pb-28"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 md:mb-0 mt-64 md:mt-0">
                        About Lando Travels
                    </h1>
                    <p className="text-white text-md md:text-lg max-w-xl text-center md:text-left">
                        At Lando Travels, we specialize in corporate travel with over two decades of experience. Our expert team ensures efficient, reliable, and personalized service for all your business travel needs.
                    </p>
                </motion.div>
            </section>

            <CompanyIntro />

            <section className="bg-white py-16 px-6 md:px-12">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.3 }}
                >
                    <motion.div
                        className="mission-hover group relative overflow-hidden border border-gray-200 rounded-xl p-8 shadow-md text-center transition-all duration-300"
                        variants={itemVariants}
                    >
                        <div className="flex justify-center mb-4 relative z-10">
                            <div className="icon-wrapper bg-blue-500 text-white group-hover:text-blue-500 group-hover:bg-white p-4 rounded-full transition duration-300">
                                <FaBullseye size={28} />
                            </div>
                        </div>
                        <h3 className="text-xl font-semibold mb-2 relative z-10 group-hover:text-white">Our Mission</h3>
                        <p className="text-gray-600 group-hover:text-white transition duration-300 relative z-10">
                            To deliver reliable, personalized, and seamless travel solutions that empower individuals and businesses to explore the world with confidence.
                        </p>
                    </motion.div>

                    <motion.div
                        className="rounded-xl overflow-hidden shadow-md w-full h-64 flex items-center justify-center"
                        variants={itemVariants}
                    >
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={missionIndex}
                                src={missionImages[missionIndex]}
                                alt="Our Mission"
                                className="w-full h-full object-cover"
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: 40, opacity: 0 }}
                                transition={{ duration: 0.8 }}
                            />
                        </AnimatePresence>
                    </motion.div>

                    <motion.div
                        className="rounded-xl overflow-hidden shadow-md w-full h-64 relative"
                        variants={itemVariants}
                    >
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={visionIndex}
                                src={visionImages[visionIndex]}
                                alt="Our Vision"
                                className="absolute inset-0 w-full h-full object-cover"
                                initial={{ y: 0, opacity: 0 }}
                                animate={{ y: -20, opacity: 1 }}
                                exit={{ y: -40, opacity: 0 }}
                                transition={{ duration: 0.8 }}
                            />
                        </AnimatePresence>
                    </motion.div>

                    <motion.div
                        className="vision-hover group relative overflow-hidden border border-gray-200 rounded-xl p-8 shadow-md text-center transition-all duration-300"
                        variants={itemVariants}
                    >
                        <div className="flex justify-center mb-4 relative z-10">
                            <div className="icon-wrapper bg-[#ff6b00] text-white group-hover:text-[#ff6b00] group-hover:bg-white p-4 rounded-full transition duration-300">
                                <FaEye size={28} />
                            </div>
                        </div>
                        <h3 className="text-xl font-semibold mb-2 relative z-10 group-hover:text-white">Our Vision</h3>
                        <p className="text-gray-600 group-hover:text-white transition duration-300 relative z-10">
                            To be the most trusted travel partner in the region, setting new standards in corporate and leisure travel through innovation and care.
                        </p>
                    </motion.div>
                </motion.div>
            </section>
            <section className="py-20 bg-gray-50 px-6 md:px-12">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: false, amount: 0.4 }}
                        className="flex justify-center"
                    >
                        <img
                            src="/user.svg"
                            alt="Director"
                            className="w-64 h-64 object-cover rounded-full shadow-lg border-4 border-white"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: false, amount: 0.4 }}
                        className="text-center md:text-left"
                    >
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">
                            Message from the Director
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            At Lando Travels, our journey began with a simple belief—that travel should be seamless, purposeful, and personal. Over the years, we've committed ourselves to building trusted partnerships and delivering services that go beyond expectations. I am proud to lead a team that values integrity, innovation, and client satisfaction above all.
                        </p>
                        <p className="mt-4 font-semibold text-blue-600">— Managing Director, Lando Travels</p>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
