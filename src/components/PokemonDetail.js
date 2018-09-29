import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Col, Row, Card, CardHeader, CardImg, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';


const PokemonDetail = ({ pokemon }) => {
    const { id, name, sprite, type, data} = pokemon;
    
    return (
        <Container>
        <Row>
        <Col sm="4">
            <Card>
                <CardHeader>Nome: {name} ID: {id}</CardHeader>
                <CardImg top src={sprite} alt={name} />
                <CardBody>
                    <CardTitle>Informações</CardTitle>
                    <h4>Tipo: </h4>
                    <ul>
                    {
                        data && data.types.map((type, index) => (
                            <li key={index}>{ type.type.name }</li>
                        ))
                    
                    }
                    </ul>
                    <h4>Habilidades: </h4>
                    <ul>
                    {
                        data && data.abilities.map((type, index) => (
                            <li key={index}>{ type.ability.name }</li>
                        ))
                    
                    }
                    </ul>
                    <h4>Status: </h4>
                    <ul>
                    {
                        data && data.stats.map((type, index) => (
                            <li key={index}>{ type.stat.name }: { type.base_stat }</li>
                        ))
                    
                    }
                    </ul>
                    <Link to="/"><Button color="primary">Voltar</Button></Link>
                </CardBody>
            </Card>
        </Col>   
        </Row> 
        </Container>
       
    )
  }
  
  export default PokemonDetail;
  
