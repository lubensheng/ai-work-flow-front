import { useEffect, useState } from "react";
import { queryFlowInfo, type ResultFlowInfo } from "./services";
import { getUserInfo } from "../../utils";
import { message, Pagination, Spin } from "antd";
import styles from "./index.module.less";
import classNames from "classnames";

function MyWorkFlow() {
  const [loading, setLoading] = useState(false);
  const [queryPageInfo, setQueryPageInfo] = useState<{
    pageIndex: number;
    pageSize: number;
  }>({ pageIndex: 1, pageSize: 10 });
  const [flowInfo, setFlowInfo] = useState<ResultFlowInfo[]>([]);
  const [total, setTotal] = useState(0);
  const queryList = async () => {
    const userInfo = getUserInfo();
    setLoading(true);
    const res = await queryFlowInfo({
      pageIndex: queryPageInfo.pageIndex,
      pageSize: queryPageInfo.pageSize,
      userName: userInfo.account,
    });
    setLoading(false);
    if (res.data.code !== 0) {
      message.error(res.data.message);
      return;
    }
    setFlowInfo(res.data.data.resultData);
    setTotal(res.data.data.total);
  };

  useEffect(() => {
    queryList();
  }, [queryPageInfo]);

  return (
    <div>
      <Spin spinning={loading}>
        <div
          style={{
            backgroundColor: "#f2f4f7",
            height: "calc(100vh - 57px)",
            padding: "16px",
            position: "relative",
          }}>
          <div
            className="grid grid-cols-4 gap-1"
            style={{ maxHeight: "calc(100% - 50px)", overflowY: "auto" }}>
            {flowInfo.map((item) => {
              return (
                <div className={styles.container} key={item.id}>
                  <div>{item.appName}</div>
                  <div
                    className={classNames(
                      "absolute",
                      "bottom-[8px]",
                      "right-[8px]",
                      "w-[60px]",
                      "text-center",
                      "cursor-pointer",
                      "p-[5px]",
                      styles.hover,
                    )}>
                    编辑
                  </div>
                </div>
              );
            })}
           
          </div>
          <div
            style={{
              background: "#fff",
              position: "absolute",
              width: "97.6%",
              height: "40px",
              bottom: "10px",
              display: "flex",
              justifyContent: "space-between",
            }}>
            <div
              style={{
                height: "40px",
                lineHeight: "40px",
                marginLeft: "10px",
              }}>
              总共{total}条
            </div>
            <Pagination
              total={total}
              size="small"
              pageSize={queryPageInfo.pageSize}
              current={queryPageInfo.pageIndex}
              onChange={(page, pageSize) => {
                setQueryPageInfo({ pageIndex: page, pageSize });
              }}
              style={{
                height: "40px",
              }}
            />
          </div>
        </div>
      </Spin>
    </div>
  );
}

export default MyWorkFlow;
