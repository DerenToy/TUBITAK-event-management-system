
import notFoundImg from "../static/img/404.png"


// Login yapmadan sayfalar görüntülenmek istendiğinde ya da yetki sahibi olmadan bir url'e gidilmeye çalışıldığında bu
// sayfa gösterilir.
export function NotFound() {
return(

<div className="container center">
    <div className="content-404">
        <img src={notFoundImg} className="img-responsive" alt="" />
        <h1><b>OPPS!</b> We Couldn’t Find this Page</h1>
        <p>Uh... So it looks like you brock something.</p>
    </div>
</div>



    )

}