"use client";
import { useEffect, useState } from 'react';
import { useNavigators } from '/contexts/NavigatorsContext';
import { useSession } from 'next-auth/react';

function NavigatorSelector() {
  const [isMounted, setIsMounted] = useState(false);
  const { selectedNavigator, setSelectedNavigator } = useNavigators();
  const session = useSession();
  const [selectValue, setSelectValue] = useState('');
  const [adminSelectValue, setAdminSelectValue] = useState(false);

  const navigatorNames = [
    { name: 'All', id: '' },
    { name: 'Me', id: session.data.user?.id },
    { name: 'Stacy Martinez', id: '67b4410753573b52275ce0c9' },
    { name: 'Hailey Jester', id: '67b4414e53573b52275ce0ca' },
    { name: 'Ashleigh Chesney', id: '67b4418653573b52275ce0cb' },
    { name: 'Rich Basche', id: '67b441ad53573b52275ce0cc' },
    { name: 'Rachael Banerdt', id: '67b441dc53573b52275ce0cd' },
    { name: 'Morgan Sole', id: '67b4418653573b52275ce0cb' },
    { name: 'Kecia Thompson-Gordon', id: '67b4424f53573b52275ce0cf' },
    { name: 'Marissa Foth', id: '67e9614a74cc11c0dff9e172' },
    { name: 'Corine Boelk', id: '67ef15a26f5242a3b5153f32' },
    { name: 'Andrew McCauley', id: '677e2852b19820275b00c061' },
    { name: 'Trevor Brunette', id: '67eab2ceb13b898d7f56ec21' },
    { name: 'Sara Jackson', id: '67eaa1d0f0d0003549891ba9' }
  ];

  const getNavigatorData = async () => {

    try {
      const response = await fetch(`/api/education-navigators?navigator=${selectValue}`);
      const data = await response.json();
      await setSelectedNavigator(data);
    } catch (error) {
      console.log(error);
    }
    // console.log("1 getNavigatorData - navigatorId:", navigatorId);
    // if (!session.data.user.status === "authenticated") return;

    // if (session.data.user.level === "admin" || session.data.user.level === "IT"){
    //   console.log("2 getNavigatorData admin or IT", session)
    //   // const response = await fetch(`/api/education-navigators?navigator=${navigatorId}`);
    //   const response = await fetch(`/api/education-navigators?navigator=${'677e2852b19820275b00c061'}`);
    //   const data = await response.json();
    //   await setSelectedNavigator(data);
    // }else if(session.data.user.level === "navigator") {
    //   console.log("3 getNavigatorData - navigator", selectedNavigator)
    //   // const response = await fetch(`/api/education-navigators?navigator=${session.data.user.name}`);
    //   const response = await fetch(`/api/education-navigators?navigator=${'677e2852b19820275b00c061'}`);
    //   const data = await response.json();
    //   await setSelectedNavigator(data);
    // }
  }

  useEffect(() => {
    getNavigatorData(selectValue).then();
  }, [selectValue, session])

  const handleNavigatorChange = async (e) => {
    await e.preventDefault();
    console.log("4 handleNavigatorChange", e.target.value)
    // const isAdmin = session.data.user.level === "admin" || session.data.user.level === "IT"
    // if (isAdmin) {
    //   await setSelectValue(e.target.value);
    // }else{
    //   await setSelectValue(session.data.user.name);
    // }
    await getNavigatorData(e.target.value).then();
  }

  useEffect(() => {
    setIsMounted(true); // ✅ Mark component as mounted before interacting with localStorage
    if (typeof window !== 'undefined') {
      if(session){
        getNavigatorData(selectValue).then();
      }
    }
  }, []);

  if (!isMounted) return null; // ✅ Prevent rendering until hydration completes

  return (
    <div>
      <select
        id="navigator-select"
        value={selectValue || ""}
        className="select select-accent"
        onChange={async (e) => {
          const response = await fetch(`/api/education-navigators?navigator=${e.target.value}`);
          const data = await response.json();
          await setSelectedNavigator(data[0]);
        }}
      >
        <option value="" disabled>Select a navigator</option>
        {navigatorNames.map((nav) => (
          <option key={nav.name} value={nav.name}>
            {nav.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default NavigatorSelector;
