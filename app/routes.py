from flask import Blueprint, render_template, request
from .services.scraper import buscar_verbo
from .services.guarda_verbos import ( 
    añadir_verbo, 
    obtener_todos,
    obtener_todos_ordenados,
    buscar_por_campo,
    contar_verbos, 
    generar_examen
)

main = Blueprint("main", __name__)

@main.route("/", methods=["GET", "POST"])
def index():
    resultado = None
    error = None

    if request.method == "POST":
        texto = request.form.get("texto", "")
        campo = request.form.get("campo", "")

        resultado = buscar_por_campo(texto, campo)
        if not resultado:
            error = "El verbo no está en la base de datos."

    return render_template(
        "index.html",
        pestaña_activa="consultar",
        resultado = resultado,
        error = error
    )

@main.route("/añadir", methods =["GET", "POST"])
def añadir():
    mensaje = None

    if request.method == "POST" and request.form:
        verbo = {
            "infinitivo": request.form.get("infinitivo","").strip(),
            "pasado": request.form.get("pasado", "").strip(),
            "participio": request.form.get("participio", "").strip(),
            "traduccion": request.form.get("traduccion", "").strip()
        }

        if añadir_verbo(verbo):
            mensaje = "Verbo añadido correctamente ✅"
        else:
            mensaje = "El verbo ya existe ❌"
    
    return render_template(
        "index.html", 
        pestaña_activa = "añadir",
        mensaje=mensaje
        )

@main.route("/todos")
def todos():
    orden = request.args.get("orden")

    if orden == "az":
        verbos = obtener_todos_ordenados()
    else:
        verbos = obtener_todos()
    
    total = contar_verbos()
    
    return render_template(
        "index.html", 
        pestaña_activa="todos",
        verbos = verbos, 
        total = total
        )

@main.route("/examinarse",  methods =["GET", "POST"])
def examinarse():
    examen = None
    cantidad = None

    if request.method == "POST":
        cantidad = int(request.form.get("cantidad"))
        examen = generar_examen(cantidad)

    return render_template(
        "index.html",
        pestaña_activa="examinarse",
        examen=examen,
        cantidad=cantidad
        )
