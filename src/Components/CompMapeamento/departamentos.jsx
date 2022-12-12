import { collection, deleteDoc, doc, getDocs, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react"
import { db } from "../../firebaseConfig";
import { addDepAction, addSectionAction, getDepAction, setDepAction, updateDepAction } from "../../services/actions/depActions";

import { Row } from 'react-bootstrap';
import TabelaDescDep from "../Tabelas/TabelaDescDep";
import departamentos from "./departamento.scss";



export default function Departamentos(props) {

    const handle = props.handleDep;
    const sectionObj = props.sectionObj;
    const handleSubMenu = props.handleSubMenu;

    const [name, setName] = useState('');
    const [nameSection, setNameSection] = useState('');
    const [descricao, setDescricao] = useState('');
    const [IdDepSelecionado, setIdDepSelecionado] = useState(null);
    const [sectionList, setSectionList] = useState([]);
 
    const [departamentos, setDepartamentos] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'Departamentos'), (snapshot) => {
            setDepartamentos(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))  
        })
        return unsubscribe;
    }, []);

    async function deleteDep(id) {
        const response = await deleteDoc(doc(db, "Departamentos", id));
        return response;
    }
    function setDep() {
        setDepAction({
            name: name,
            areas: [
                { area: '0001' },
                { area: '0022' },
                { area: '0111' }
            ]
        }, 'dep003');
    }
    function addDep() {
        addDepAction({
            name: name,
            qntSessoes: 6,
            qntProdutos: 524,
            brutoTotal: 24348,
            responsavel: 'Dione',
            ultInventario: '18/07/2022',
            status: 'Validado',
        });
        setName('');
    }
    function exiberDescricao(id) {
        setIdDepSelecionado(id);
        function selecionarSessao(id) {
            const sessionRef = collection(db, 'Departamentos', `${id}`, 'Sessoes');
            const getData = async () => {
                const data = await getDocs(sessionRef);
                setSectionList(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
            }
            getData();
        }

        const dep = departamentos.find(dep => dep.id === id);
        setDescricao(dep);
        selecionarSessao(id) 
        handle(id);
        
        
    }
    function selecaoSessao(id) {
        const session = sectionList.find(session => session.id === id);
        sectionObj(session);
        handleSubMenu("Sessoes")
    }
    function addSection(){
        const id = IdDepSelecionado;
        addSectionAction({
            sectionName: nameSection,
            qntProdutos: 524,
            brutoTotal: 24348,
            responsavel: 'Dione',
            ultInventario: '18/07/2022',
            status: 'Validado',
           }
        , id);
        setNameSection('');
    }

    return (
        <div className="mainDep">
            <div className="topMain">
                {/* Listagem dos Departamentos */}
                <div className="renderDep">
                    <ul className={`renderList `}>
                        {departamentos && departamentos.map((departamento) => (
                            <li key={departamento.id} >
                                <div >
                                    <button className={`renderButton ${IdDepSelecionado === departamento.id && 'selected'}`} onClick={() => { exiberDescricao(departamento.id) }}>
                                        {departamento.name}</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    {/* Adicionar Departamento */}
                    <div>
                        <p>Adicionar Departamento</p>
                        <input type="text"
                            placeholder="Nome do Departamento"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <button className="botaoAdd" onClick={addDep}>Adicionar</button>
                        <button className="botaoAdd" onClick={setDep}>Setar</button>
                    </div>
                </div>

                {/* Sessões do Departamento */}           
                <div >
                    {   sectionList.length > 0  ? sectionList.map((section) => (
                        <div key={section.id}>
                            <button onClick={() => {selecaoSessao(section.id)}} className="Sessoes">{section.sectionName}</button>
                        </div>
                    )) : (<p>Nenhuma Sessão Cadastrada!</p>)}
                    
                    <input type="text"
                            placeholder="Nome da Sessão"
                            value={nameSection}
                            onChange={(e) => setNameSection(e.target.value)}
                        />
                    <button onClick={()=>{addSection()}} className="Sessoes addSection">Adicionar Sessão</button>
                </div>

            </div>

            {/* Detalhes do Departamento */}
            <div>
                visualizar departamentos
                <div>
                    <div className="Border">
                        <h4>{descricao.name}</h4>
                        {descricao && (<button className="botaoAdd" onClick={() => { deleteDep(descricao.id) }}>Excluir Departamento</button>)}
                    </div>
                    <Row>
                        <TabelaDescDep desc={descricao} />
                    </Row>
                </div>

            </div>
        </div>

    )
}