import { Button, Card, Col, Divider, Row, Upload, UploadProps } from "antd";
import { useEffect, useState } from "react";
import { exportUser, getUser, UPLOAD_URL, UserDto } from "@app/services/user.service";
import { Table } from "@app/components/table/Table";

function App() {
  const [lstUsers, setLstUsers] = useState<UserDto[]>([]);

  useEffect(() => {
    getUser().then((data: UserDto[]) => {
      setLstUsers(data);
    });
  }, []);

  const btnExportClicked = async (): Promise<void> => {  
    return await exportUser();
  }

  const props: UploadProps = {
    name: 'file',
    action: UPLOAD_URL,
    method: 'POST',
    maxCount: 1,
    accept: '.xlsx',
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        getUser().then((data: UserDto[]) => {
          setLstUsers(data);
        });    
      } else if (info.file.status === 'error') {
        console.log('uploading failed');
      }
    },
  };  

  return (
    <>
      <Row>
        <Col span={18} offset={3}>
          <Card>
            <Row>
              <Col span={12}>
                <Button onClick={() => { }} type={"primary"}>
                  Update Checked
                </Button>
              </Col>
              <Col span={12}>
                <Row justify={"end"}>
                  <Button onClick={btnExportClicked} type={"primary"}>
                    Export Excel
                  </Button>
                  <Upload {...props}>
                    <Button type={"primary"}>
                      Import Excel
                    </Button>
                  </Upload>
                </Row>
              </Col>
            </Row>

            <Divider />

            <Row>
              <Col span={24}>
                <Table lstUsers={lstUsers} />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default App;
