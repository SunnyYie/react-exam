import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import type Salesman from '@/types/student_manage';
// import type any from '@/types/rootState';
// import type { any } from "../model";
import { Checkbox, message, Modal } from 'antd'
import { setModalVisible } from '@/store/student_management'
import { useAppDispatch, useAppSelector } from '@/store'

const CheckboxGroup = Checkbox.Group
const JurisdictionModal: React.FC<any> = () => {
  const dispatch = useAppDispatch()
  const [plainOptions, setPlainOptions] = useState(['']) //全部的
  const [checkedList, setCheckedList] = useState(['']) //拥有的
  const [indeterminate, setIndeterminate] = useState(true)
  const [checkAll, setCheckAll] = useState(false)
  const modalVisible = useAppSelector((state) => state.student_management.modalVisible)

  // const { currentItem, jurisdictionModal, SalesmanGrouping, SalesmanGroupListEnable } = useSelector((state: any) => state.student_manage);
  // const SalesmanGrouping: unknown = []
  // const SalesmanGroupListEnable: unknown = []
  const onChange = (list: any) => {
    setCheckedList(list)
    setIndeterminate(!!list.length && list.length < plainOptions.length)
    setCheckAll(list.length === plainOptions.length)
  }

  const onCheckAllChange = (e: any) => {
    setCheckedList(e.target.checked ? plainOptions : [])
    setIndeterminate(false)
    setCheckAll(e.target.checked)
  }

  useEffect(() => {
    dispatch<any>({ type: 'student_manage/queryGroups', payload: { current: 1, pageSize: 500 } })
  }, [])

  // useEffect(() => {
  //     dataProcessingGrouping();
  // }, [SalesmanGrouping])
  //
  //
  // useEffect(() => {
  //     dataProcessingSalesmanGroupListEnable();
  //     dataProcessingDate();
  // }, [SalesmanGroupListEnable])

  //获取所有key Value 值
  // const dataProcessingDate = () => {
  //     setdate([{name: '', id: 0}]);
  //     if (SalesmanGroupListEnable && SalesmanGroupListEnable.length > 0) {
  //         setdate(SalesmanGroupListEnable.map((item: { name: any; id: any; }) => ({name: item.name, id: item.id})));
  //     }
  // }
  //
  // //获取当前全部分组
  // const dataProcessingSalesmanGroupListEnable = () => {
  //     plainOptions.splice(0)
  //     if (SalesmanGroupListEnable && SalesmanGroupListEnable.length > 0) {
  //         // @ts-ignore
  //         setPlainOptions(SalesmanGroupListEnable.map(({name}) => name));
  //     }
  // }
  //
  // //处理当前角色拥有查看那些分组
  // const dataProcessingGrouping = () => {
  //     checkedList.splice(0)
  //     if (SalesmanGrouping && SalesmanGrouping.length > 0) {
  //         // @ts-ignore
  //         setCheckedList(SalesmanGrouping.map(({name}) => name));
  //     }
  // }
  // useEffect(() => {
  //     getPermission()
  //     getPermissionListEnable()
  // }, [currentItem])
  //
  // //获取当前SalesmanId拥有的分组
  // const getPermission = () => {
  //     if (currentItem && currentItem.id) {
  //         dispatch<any>({
  //             type: 'student_manage/queryBySalesmanId',
  //             payload: currentItem?.id,
  //         });
  //     }
  // }

  //获取所有分组
  const getPermissionListEnable = () => {
    dispatch<any>({
      type: 'student_manage/queryListEnable',
      payload: { current: 1, pageSize: 200 },
    })
  }

  //是否显示弹窗
  const handleVisibleChange = () => {
    // setModalVisible(false)
    dispatch(setModalVisible(false))

    console.log('handleVisibleChange')
    // if (!visible) {
    //     dispatch<any>({
    //         type: 'student_manage/updateState',
    //         payload: {jurisdictionModal: false},
    //     });
    // }
  }
  const handleOk = () => {
    // setModalVisible(false)
    dispatch(setModalVisible(false))

    console.log('handleOk')
  }

  // const handleFinish = async (value: any) => {
  //     const selectedIds = date.filter(iteman => checkedList.includes(item.name)).map(item => item.id);
  //     if (currentItem && currentItem.id) {
  //         dispatch<any>({
  //             type: 'student_manage/createSalesmanGroups',
  //             payload: { id: currentItem.id, ids: selectedIds }
  //         });
  //     }
  // };

  return (
    <Modal
      key="JurisdictionModal"
      title={'课程权限编辑'}
      width="800px"
      open={modalVisible}
      onCancel={handleVisibleChange}
      onOk={handleOk}
      // onFinish={handleFinish}
      // onFinish={async (value: any) => {
      //     if (!loading.effects['student_manage/createSalesmanGroups']) {
      //         await handleFinish(value);
      //     } else {
      //         message.error('请勿重复点击!')
      //     }
      // }}
    >
      {/*<span>查阅权限:</span><br/><br/>*/}
      <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
        关门弟子课
      </Checkbox>
      <br />
      <br />
      <CheckboxGroup style={{ width: '100%' }} value={checkedList} onChange={onChange}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
          {plainOptions.map((item: String, key: any) => {
            return (
              <div key="">
                <div style={{ width: '33%' }}>
                  <Checkbox value={item}>{item}</Checkbox>
                </div>
              </div>
            )
          })}
        </div>
      </CheckboxGroup>
    </Modal>
  )
}

export default JurisdictionModal
