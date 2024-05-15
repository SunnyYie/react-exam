import ListTable from './components/ListTable'
import JurisdictionModal from './components/JurisdictionModal'
import { useAppSelector } from '@/store'
import { get_student_management_list } from '@/store/student_management'

function StudentManage() {
  const modalVisible = useAppSelector(get_student_management_list)
  return (
    <>
      <ListTable />
      {modalVisible && <JurisdictionModal />}
    </>
  )
}

export default StudentManage
