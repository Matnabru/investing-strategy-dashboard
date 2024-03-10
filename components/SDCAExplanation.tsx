import Image from 'next/image';



interface SDCAExplanationProps {
    imageSrc: string;
    indicatorSrc: string;
    zscoreSrc: string;
}

const SDCAExplanation: React.FC<SDCAExplanationProps> = ({ imageSrc, indicatorSrc, zscoreSrc }) => {

    return (
        <div className="bg-gray-800 p-6 rounded-lg transition-transform">

            <h4 className='text-2xl font-bold text-white mb-4'>What is Dollar Cost Averaging?</h4>
            <p className="text-white text-lg">
                Dollar Cost Averaging is a strategy that uses buying asset with fixed amounts of money over time.
                <br />
                For example buying 1000$ worth of Bitcoin once a month.
                <br />
                Over time strategy ends up with best possible price over time and is widely used across the world as a simple to implement, but as you can see in the image below it's suboptimal in principle due to also buying when the prices are high.
                <br />
            </p>
            <Image src={imageSrc} alt="SDCA" className="rounded-lg mb-4" width={1080} height={600} />
            <p className="text-white text-lg mt-2">
                <strong>How can we improve it?</strong>
                <br />
                Using additional information we can modify his strategy to sell assets instead, once the prices are high.
            </p>
            <p className="text-white text-lg mt-4">
                <strong>How does it work in principle?</strong>
                <br />
                Combining multiple indicators like shown below we rate them across normal distribution.
                <Image src={indicatorSrc} alt="SDCA" className="rounded-lg mb-4" width={1080} height={600} />
                <br /><br /><strong>Current system has multiple fundamental, technical and sentiment indicators, this add up to the average score that represent current state of Bitcoin cycle.</strong>
                <br /> In case of our SDCA strategy values range from -3 to 3 where 3 means approximate of the market cycle and -3 means bottom.
            </p>

            <p className="text-white text-lg mt-4">
                <strong>How does Z-score calculated?</strong>
                <br />
                It is based on the standard normal distribution.
                <Image src={zscoreSrc} alt="SDCA" className="rounded-lg mb-4" width={1080} height={600} />
            </p>
        </div>
    );
};

export default SDCAExplanation;
