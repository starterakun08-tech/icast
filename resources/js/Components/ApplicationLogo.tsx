export default function ApplicationLogo(props: React.ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img
            src="/images/icast-logo.svg"
            alt="iCAST Logo"
            {...props}
        />
    );
}
