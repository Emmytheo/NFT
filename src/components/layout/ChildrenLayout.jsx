

const ChildrenLayout = (props) => {
    const { children } =  props;
    // console.log(children);
    return (
        
        <main>
            <article className="container article">
            {children}
            </article>
        </main>
    )
    

};

export default ChildrenLayout;