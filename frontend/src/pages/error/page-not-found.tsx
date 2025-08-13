import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Ops... Parece que você saiu da rota. Melhor voltar para o caminho certo!"
      extra={
        <Button type="primary">
          <Link to="/home">Voltar para Home</Link>
        </Button>
      }
    />
  );
};

export default PageNotFound;